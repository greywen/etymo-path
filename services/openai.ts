type Role = 'system' | 'user' | 'assistant';
type Message = {
  role: Role;
  content: string;
};

export const OpenAI = async (messages: Message[]) => {
  const { host, apiKey, model, version, modelType } = process.env;

  let url = `${host}/v1/chat/completions`;
  if (modelType === 'azure') {
    const apiHost = host;
    url = `${apiHost}/openai/deployments/${model}/chat/completions?api-version=${version}`;
  }

  const body = {
    headers: {
      'Content-Type': 'application/json',
      ...(modelType === 'openai' && {
        Authorization: `Bearer ${apiKey}`,
      }),
      ...(modelType === 'azure' && {
        'api-key': apiKey,
      }),
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages,
      temperature: 1,
    }),
  };

  const res = await fetch(url, body);

  if (res.status !== 200) {
    let errors = {} as any;
    errors = await res.json();
    throw new Error(JSON.stringify(errors));
  }
  return await res.json();
};
