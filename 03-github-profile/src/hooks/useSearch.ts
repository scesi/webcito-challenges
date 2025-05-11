import { useState, useEffect } from 'react';
import type { RepoData } from '../types';

export const useSearch = (query: string, username: string) => {
  const [allRepos, setAllRepos] = useState<RepoData[]>([]);
  const [results, setResults] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_API_URL}users/${username}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAllRepos(data);
        setResults(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(allRepos);
    } else {
      const filtered = allRepos.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query, allRepos]);

  return [results, loading, error] as const;
};
