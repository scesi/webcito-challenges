import { createAdapterProfile, createAdapterRepo } from '../lib/adapters';
import type { ProfileData } from '../types';

const api_base = import.meta.env.PUBLIC_API_URL;
console.log('API Base URL: ', api_base);

export const getProfileData = async (username: string) => {
  try {
    const response = await fetch(`${api_base}users/${username}`);
    if (!response.ok) {
      throw new Error(`Error fetching profile data: ${response.statusText}`);
    }
    const data: ProfileData = await response.json();
    return createAdapterProfile(data);
  } catch (error) {
    console.error('Error fetching profile data: ', error);
    throw error;
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const response = await fetch(`${api_base}users/${username}/repos`);
    if (!response.ok) {
      throw new Error(`Error fetching user repos: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('User Repos Data: ', data);
    
    return createAdapterRepo(data);
  } catch (error) {
    console.error('Error fetching user repos: ', error);
    throw error;
  }
};
