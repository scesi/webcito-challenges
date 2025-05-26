import { Profile } from '@/app/types/profile';
import { Inter } from 'next/font/google';
import {
  LocationUserIcon,
  ProjectIcon,
  TwitterIcon,
  UsersIcon,
} from '../icons';

type Props = {
  profile: Profile;
};

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const InfoSocialProfile = ({ profile }: Props) => {
  return (
    <section className={`${inter.className} flex flex-col`}>
      <p className="text-gray-400 text-[16px] my-3">{profile.bio}</p>
      <div className="flex items-center">
        <span className="flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />
          <p>{profile.followers}</p>
          <p className="text-gray-400">Followers</p>
          · <p>{profile.following}</p>
          <p className="text-gray-400">Following</p> ·
        </span>
      </div>

      {profile.location && (
        <div className="flex items-center gap-2 my-3 text-gray-400">
          <LocationUserIcon className="w-5 h-5" />
          <p>{profile.location}</p>
        </div>
      )}
      {profile.blog && profile.blog !== '' && (
        <div className="flex items-center gap-2 my3">
          <ProjectIcon className="w-5 h-5" />
          <a href={profile.blog} target="_blank" rel="noreferrer">
            <span>{profile.blog}</span>
          </a>
        </div>
      )}
      {profile.twitter_username && (
        <div className="flex items-center gap-2">
          <TwitterIcon className="w-5 h-5" />
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
