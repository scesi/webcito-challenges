const API_URL = "https://api.github.com/users";

export const fetchUserGithub = async (username: string) => {
  const response = await fetch(`${API_URL}/${username}`);
  const data = await response.json();
  return data;
};
