export async function getLanguages(username: string, repoName: string) {
  const api = process.env.NEXT_PUBLIC_GITHUB_API;
  const response = await fetch(`${api}/repos/${username}/${repoName}/languages`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) throw new Error('Error fetching languages data');
  return await response.json();
}
