import { ActionsButtons } from "@/components/profile/actions-buttons";
import Avatar from "@/components/profile/avatar";
import HeaderProfile from "@/components/profile/header-profile";
import { fetchUserGithub } from "@/services/github-service";
import { Profile } from "./types/profile";
import { InfoSocialProfile } from "@/components/profile/info-social-profile";

export default async function Home() {
  const userGithub: Profile = await fetchUserGithub("ivancidev");
  return (
    <div className="container max-w-2xl py-10 px-20">
      <div className="w-[300px]">
        <Avatar src={userGithub.avatar_url} alt={userGithub.name} />
        <HeaderProfile name={userGithub.name} userName={userGithub.login} />
        <ActionsButtons />
        <InfoSocialProfile profile={userGithub} />
      </div>
    </div>
  );
}
