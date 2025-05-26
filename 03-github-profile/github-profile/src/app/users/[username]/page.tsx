import UseCard from '@/components/useCardRepos';

export async function generateStaticParams() {
  const users = ['alfredoronald', 'devferx', 'Amiddala', 'midudev'];
  return users.map((username) => ({ username }));
}
export const revalidate = false;
export const dynamicParams = true;
interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;
  return (
    <main className="w-full px-5">
      <UseCard username={username} />
    </main>
  );
}
