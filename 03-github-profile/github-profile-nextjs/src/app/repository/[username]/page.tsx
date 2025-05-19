import { Profile } from "@/app/types/profile";
import { Repo } from "@/app/types/repo";
import { ActionsButtons } from "@/components/profile/actions-buttons";
import Avatar from "@/components/profile/avatar";
import HeaderProfile from "@/components/profile/header-profile";
import { InfoSocialProfile } from "@/components/profile/info-social-profile";
import { RepositoriesSection } from "@/components/repository/repo-section";

export const revalidate = 3600;

async function getProfileAndRepos(username: string) {
  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
  ]);

  const profile: Profile = await profileRes.json();
  const repos: Repo[] = await reposRes.json();
  return { profile, repos };
}

export async function generateStaticParams() {
  const usernames = ["ivancidev", "octocat", "gaearon"];
  return usernames.map((username) => {
    return {
      username,
    };
  });
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { profile, repos } = await getProfileAndRepos(username);

  return (
    <div className="flex justify-center py-10 px-20">
      <div className="w-[300px]">
        <Avatar src={profile.avatar_url} alt={profile.name} />
        <HeaderProfile name={profile.name} userName={profile.login} />
        <ActionsButtons />
        <InfoSocialProfile profile={profile} />
      </div>
      <div className="flex-1 w-full">
        <RepositoriesSection repos={repos} />
      </div>
    </div>
  );
}
