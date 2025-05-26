export async function getGitRepos(username: string) {
    const api = process.env.NEXT_PUBLIC_GITHUB_API;
    const response = await fetch(`${api}/users/${username}/repos?page=1&sort=updated` ,{
        next:{revalidate: 60},
    });
    if(!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}
