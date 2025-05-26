export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  topics: string[];
  private: boolean;
  fork: boolean;
  archived: boolean;
  mirror_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
