import type { RepoData } from '@/src/types/index';

export const createAdapterRepo = (data: any[]): RepoData[] => {
  return data.map((repo) => ({
    name: repo.name,
    visibility: repo.visibility,
    description: repo.description || '',
    topics: repo.topics || [],
    language: repo.language || 'Unknown',
    stars: repo.stars || 0,
    forks: repo.forks || 0,
    url: repo.html_url,
  }));
};
