import { useEffect, useState } from "react";
import { Repository } from "@/interfaces/gitHubRepo";
import { GitHubUser } from "@/interfaces/gitHubUser";
import { getUsers } from "@/services/github";
import { getGitRepos } from "@/services/gitRepos";

export function useGithubProfile(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUsers(username);
        const reposData = await getGitRepos(username);
        setUser(userData);
        setRepos(reposData);
      } catch {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [username]);

  return { user, repos, error };
}