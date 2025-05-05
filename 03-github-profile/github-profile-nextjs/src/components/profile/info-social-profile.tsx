import { Profile } from "@/app/types/profile";

type Props = {
  profile: Profile;
};
export const InfoSocialProfile = ({ profile }: Props) => {
  return (
    <section>
      {profile.bio && <p className="text-gray-500 text-sm">{profile.bio}</p>}
      <div className="flex items-center gap-2">
        <span>
          {/* icon */}
          <b>{profile.followers}</b> Followers <b>{profile.following}</b>{" "}
          Following
        </span>
      </div>
      {profile.public_gists && (
        <div className="flex items-center gap-2">
          {/* icon */}
          <span>{profile.public_gists}</span>
        </div>
      )}
      {profile.location && (
        <div className="flex items-center gap-2">
          {/* icon */}
          <span>{profile.location}</span>
        </div>
      )}
      {profile.blog && profile.blog !== "" && (
        <div className="flex items-center gap-2">
          {/* icon */}
          <a href={profile.blog} target="_blank" rel="noreferrer">
            <span>{profile.blog}</span>
          </a>
        </div>
      )}
      {profile.twitter_username && (
        <div className="flex items-center gap-2">
          {/* icon */}
          <a
            href={`https://twitter.com/${profile.twitter_username}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>{profile.twitter_username}</span>
          </a>
        </div>
      )}
    </section>
  );
};
