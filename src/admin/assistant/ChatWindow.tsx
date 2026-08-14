import { useEffect, useMemo, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Alert, Tag } from 'antd';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { ProposalCard, type Proposal } from './ProposalCard';
import { accessToken } from './threads';

const READ_TOOL_LABEL: Record<string, string> = {
  'tool-list_content_keys': '查看可編輯欄位 Listing editable fields',
  'tool-get_site_content': '讀取網站文字 Reading website text',
  'tool-get_doctor_schedule': '讀取醫生當值表 Reading doctor rota',
  'tool-get_site_images': '讀取相片欄位 Reading picture slots',
};

type ToolPart = {
  type: string;
  toolCallId?: string;
  state?: string;
  output?: unknown;
};

function proposalOf(output: unknown): Proposal | null {
  if (output && typeof output === 'object' && 'proposal' in output) {
    return (output as { proposal: Proposal }).proposal;
  }
  return null;
}

export function ChatWindow({
  threadId,
  initialMessages,
  onFirstMessage,
}: {
  threadId: string;
  initialMessages: UIMessage[];
  onFirstMessage?: () => void;
}) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        headers: async () => ({ Authorization: `Bearer ${await accessToken()}` }),
        body: { threadId },
      }),
    [threadId],
  );

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
  });

  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId, status]);

  const busy = status === 'submitted' || status === 'streaming';

  async function submit(_message: unknown, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    const isFirst = messages.length === 0;
    await sendMessage({ text });
    if (isFirst) onFirstMessage?.();
    textareaRef.current?.focus();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="請問需要更改甚麼？"
              description="例如：「將星期六下午改為麥醫生」或「把首頁標題改成…」。我會先列出建議，您按「套用」才會儲存。"
            />
          ) : null}

          {messages.map((m) => (
            <Message from={m.role} key={m.id}>
              <MessageContent>
                {m.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return m.role === 'assistant' ? (
                      <MessageResponse key={index}>{part.text}</MessageResponse>
                    ) : (
                      <span key={index} style={{ whiteSpace: 'pre-wrap' }}>
                        {part.text}
                      </span>
                    );
                  }

                  const toolPart = part as ToolPart;
                  if (!toolPart.type?.startsWith('tool-')) return null;

                  const proposal =
                    toolPart.state === 'output-available' ? proposalOf(toolPart.output) : null;
                  if (proposal) {
                    return (
                      <ProposalCard
                        key={index}
                        proposal={proposal}
                        toolCallId={toolPart.toolCallId ?? `${m.id}-${index}`}
                      />
                    );
                  }

                  const label = READ_TOOL_LABEL[toolPart.type];
                  if (!label) return null;
                  return toolPart.state === 'output-available' ? (
                    <Tag key={index} color="default" style={{ marginTop: 4 }}>
                      {label}
                    </Tag>
                  ) : (
                    <Shimmer key={index}>{`${label}…`}</Shimmer>
                  );
                })}
              </MessageContent>
            </Message>
          ))}

          {status === 'submitted' ? <Shimmer>思考中 Thinking…</Shimmer> : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {error ? (
        <Alert type="error" showIcon style={{ margin: '8px 0' }} message={error.message} />
      ) : null}

      <PromptInput onSubmit={submit}>
        <PromptInputTextarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入指示… / Type an instruction…"
        />
        <PromptInputFooter className="justify-end">
          <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
