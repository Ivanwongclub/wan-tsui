import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@supabase/supabase-js';
import { convertToModelMessages, streamText, stepCountIs, type UIMessage } from 'ai';
import { createLovableAiGatewayProvider } from '@/lib/ai-gateway.server';
import { buildAssistantTools } from '@/lib/assistant/tools.server';

const SYSTEM_PROMPT = `You are the admin assistant for 環翠綜合醫務中心 (Wan Tsui Integrated Medical Centre).

You help clinic staff read and change the website: the wording (Traditional Chinese and English), the seven-day doctor duty rota, and the picture slots.

Rules:
- Reply in the language the user writes in (Traditional Chinese or English).
- Call list_content_keys before guessing a content key.
- You can NEVER save changes yourself. To change anything, call propose_content_update or propose_schedule_update. The staff member then presses "套用 / Apply" in the chat to save it.
- After proposing, tell the user briefly what will change and that they must press Apply.
- Keep answers short and plain — the reader is clinic reception staff, not a developer.`;

function titleFrom(messages: UIMessage[]): string | null {
  const first = messages.find((m) => m.role === 'user');
  if (!first) return null;
  const text = first.parts
    .map((p) => (p.type === 'text' ? p.text : ''))
    .join(' ')
    .trim();
  if (!text) return null;
  return text.slice(0, 60);
}

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get('authorization') ?? '';
        const token = authHeader.replace(/^Bearer\s+/i, '').trim();
        if (!token) return new Response('Unauthorized', { status: 401 });

        const supabaseUrl = process.env['SUPABASE_URL'] ?? process.env['VITE_SUPABASE_URL'];
        const supabaseKey =
          process.env['SUPABASE_PUBLISHABLE_KEY'] ??
          process.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ??
          process.env['SUPABASE_ANON_KEY'];
        const apiKey = process.env['LOVABLE_API_KEY'];
        if (!supabaseUrl || !supabaseKey) return new Response('Backend not configured', { status: 500 });
        if (!apiKey) return new Response('Missing LOVABLE_API_KEY', { status: 500 });

        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: `Bearer ${token}` } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        if (!user) return new Response('Unauthorized', { status: 401 });

        const { data: adminRow } = await supabase
          .from('admin_users')
          .select('active')
          .eq('user_id', user.id)
          .maybeSingle();
        if (!adminRow || adminRow.active !== true) return new Response('Forbidden', { status: 403 });

        const body = (await request.json()) as { messages?: unknown; threadId?: unknown };
        const messages = body.messages;
        const threadId = typeof body.threadId === 'string' ? body.threadId : null;
        if (!Array.isArray(messages)) return new Response('Messages are required', { status: 400 });
        if (!threadId) return new Response('threadId is required', { status: 400 });

        const { data: thread } = await supabase
          .from('chat_threads')
          .select('id, title')
          .eq('id', threadId)
          .maybeSingle();
        if (!thread) return new Response('Thread not found', { status: 404 });

        const uiMessages = messages as UIMessage[];
        const gateway = createLovableAiGatewayProvider(apiKey);

        const result = streamText({
          model: gateway('google/gemini-3.6-flash'),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(uiMessages),
          tools: buildAssistantTools(supabase),
          stopWhen: stepCountIs(50),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
          onFinish: async ({ messages: finalMessages }) => {
            try {
              const rows = (finalMessages as UIMessage[]).map((m) => ({
                thread_id: threadId,
                user_id: user.id,
                role: m.role,
                parts: m.parts as unknown as Record<string, unknown>[],
              }));
              const del = await supabase.from('chat_messages').delete().eq('thread_id', threadId);
              if (del.error) console.error('[chat] delete failed', del.error);
              const ins = await supabase.from('chat_messages').insert(rows);
              if (ins.error) console.error('[chat] insert failed', ins.error);

              const nextTitle = titleFrom(finalMessages as UIMessage[]);
              if (nextTitle && (!thread.title || thread.title === '新對話')) {
                const upd = await supabase
                  .from('chat_threads')
                  .update({ title: nextTitle })
                  .eq('id', threadId);
                if (upd.error) console.error('[chat] title update failed', upd.error);
              } else {
                await supabase
                  .from('chat_threads')
                  .update({ updated_at: new Date().toISOString() })
                  .eq('id', threadId);
              }
            } catch (error) {
              console.error('[chat] persistence failed', error);
            }
          },
        });
      },
    },
  },
});
