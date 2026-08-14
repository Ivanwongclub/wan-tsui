import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

/** Lovable AI Gateway provider (OpenAI-compatible endpoint). */
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: 'lovable-ai-gateway',
    baseURL: 'https://ai.gateway.lovable.dev/v1',
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}
