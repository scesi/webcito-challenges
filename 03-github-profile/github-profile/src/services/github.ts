export async function getUsers(username: string) {
    const api = process.env.NEXT_PUBLIC_GITHUB_API;
    const response = await fetch(`${api}/users/${username}` ,{
        next: { revalidate: 60 },
        // Bearer token
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
        }
    });
    if(!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}
