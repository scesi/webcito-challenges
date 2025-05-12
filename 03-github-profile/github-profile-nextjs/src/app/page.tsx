import { ActionsButtons } from "@/components/profile/actions-buttons";
import Avatar from "@/components/profile/avatar";
import HeaderProfile from "@/components/profile/header-profile";
import { Profile } from "./types/profile";
import { InfoSocialProfile } from "@/components/profile/info-social-profile";
import { RepositoriesSection } from "@/components/repository/repo-section";
import { Repo } from "./types/repo";

// Puedes hacer fetch SSR o CSR. Aquí ejemplo SSR:
async function getProfileAndRepos(username: string) {
  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
  ]);
  const profile: Profile = await profileRes.json();
  const repos: Repo[] = await reposRes.json();
  return { profile, repos };
}

export default async function Home() {
  const username = "ivancidev";
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
