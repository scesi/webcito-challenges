export interface ProfileData {
    data: {
      name: string;
      nickname: string;
      avatar_url: string;
      bio: string;
      followers: number;
      following: number;
      stars: number;
      location: string;
      website: string;
      twitter_username?: string;
      instagram_username?: string;
      linkedin_username?: string;
    };
  }