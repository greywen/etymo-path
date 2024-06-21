import TranslateManagement from '@managements/translate';

export async function POST(request: Request) {
  const { value } = await request.json();
  console.log('value \n', value);
  if (value) {
    const word = await TranslateManagement.openAI(value);
    return Response.json(word);
  }
}
