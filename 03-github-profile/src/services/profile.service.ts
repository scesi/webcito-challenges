import { createAdapterProfile, createAdapterRepo } from '../lib/adapters';
import type { ProfileData, RepoData } from '../types';

const API_BASE = import.meta.env.PUBLIC_API_URL;

const fetchWithHandling = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  return response.json();
};

export const getProfileData = async (
  username: string
): Promise<ProfileData> => {
  const data = await fetchWithHandling<any>(`${API_BASE}users/${username}`);
  return createAdapterProfile(data);
};

export const getUserRepos = async (username: string): Promise<RepoData[]> => {
  const data = await fetchWithHandling<any[]>(
    `${API_BASE}users/${username}/repos`
  );
  return createAdapterRepo(data);
};
