import { OpenAIWordResult } from '@/type/services/word';

export enum MessageRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}

export type Message = {
  role: MessageRole;
  content: string;
};

export const OpenAI = async (
  messages: Message[]
): Promise<OpenAIWordResult> => {
  const {
    OPEN_AI_HOST,
    OPEN_AI_API_KEY,
    OPEN_AI_MODEL,
    OPEN_AI_VERSION,
    OPEN_AI_TYPE,
    OPEN_AI_TEMPERATURE,
  } = process.env;

  let url = `${OPEN_AI_HOST}/v1/chat/completions`;
  if (OPEN_AI_TYPE === 'azure') {
    const apiHost = OPEN_AI_HOST;
    url = `${apiHost}/openai/deployments/${OPEN_AI_MODEL}/chat/completions?api-version=${OPEN_AI_VERSION}`;
  }

  const body = {
    headers: {
      'Content-Type': 'application/json',
      ...(OPEN_AI_TYPE === 'openai' && {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      }),
      ...(OPEN_AI_TYPE === 'azure' && {
        'api-key': OPEN_AI_API_KEY,
      }),
    },
    method: 'POST',
    body: JSON.stringify({
      messages,
      temperature: +OPEN_AI_TEMPERATURE!,
      max_tokens: 4096,
      stream: true,
    }),
  };

  const res = await fetch(url, body);

  if (res.status !== 200) {
    const error = await res.json();
    throw new Error(JSON.stringify(error));
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  async function* processBuffer() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex;
      while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, newlineIndex + 1).trim();
        buffer = buffer.slice(newlineIndex + 1);

        if (line.startsWith('data: ')) {
          yield line.slice(5).trim();
        }

        if (line === '') {
          continue;
        }
      }
    }
  }

  let result = {} as OpenAIWordResult;
  let text = '';
  for await (const message of processBuffer()) {
    if (message === '[DONE]') {
      result = JSON.parse(text);
    } else {
      const value = JSON.parse(message);
      if (value.choices.length > 0 && value.choices[0].delta?.content) {
        text += value.choices[0].delta.content;
      }
    }
  }
  return result;
};
