import WordManagement from '@managements/word';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  if (name) {
    const word = await WordManagement.findByName(name);
    return Response.json(word);
  }
}
