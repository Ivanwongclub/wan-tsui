import { supabase } from '@/integrations/supabase/client';
import type { UIMessage } from 'ai';

export type ChatThread = {
  id: string;
  title: string;
  updated_at: string;
};

export async function listThreads(): Promise<ChatThread[]> {
  const { data, error } = await supabase
    .from('chat_threads')
    .select('id, title, updated_at')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ChatThread[];
}

export async function createThread(): Promise<ChatThread> {
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user.id;
  if (!userId) throw new Error('Not signed in');
  const { data, error } = await supabase
    .from('chat_threads')
    .insert({ user_id: userId, title: '新對話' })
    .select('id, title, updated_at')
    .single();
  if (error) throw error;
  return data as ChatThread;
}

export async function deleteThread(id: string): Promise<void> {
  const { error } = await supabase.from('chat_threads').delete().eq('id', id);
  if (error) throw error;
}

export async function loadMessages(threadId: string): Promise<UIMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('id, role, parts')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id as string,
    role: row.role as UIMessage['role'],
    parts: (row.parts ?? []) as UIMessage['parts'],
  }));
}

export async function accessToken(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? '';
}
