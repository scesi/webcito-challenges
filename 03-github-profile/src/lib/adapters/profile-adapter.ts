import type { ProfileData } from '@/src/types/index';

export const createAdapterProfile = (data: any): ProfileData => {
  const formattedData: ProfileData = {
    name: data.name,
    nickname: data.login,
    avatar_url: data.avatar_url,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    stars: data.stars,
    location: data.location,
    website: data.website,
    topics: data.topics,
    twitter_username: data.twitter_username || null,
    instagram_username: data.instagram_username || null,
    linkedin_username: data.linkedin_username || null,
    repos: data.public_repos,
  };
  return formattedData;
};
