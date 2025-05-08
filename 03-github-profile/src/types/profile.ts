export interface ProfileData {
  name: string;
  nickname: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  stars: number;
  location: string;
  website: string;
  topics: string[];
  twitter_username?: string;
  instagram_username?: string;
  linkedin_username?: string;
  repos: number;
}
