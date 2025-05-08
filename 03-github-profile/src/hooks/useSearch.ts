import { useState, useEffect } from 'react';

export const useSearch = (query: string, username: string) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      fetch(`${import.meta.env.PUBLIC_GITHUB_API_URL}/users/${username}/repos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const filtered = data.filter((item: any) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          );
          if (filtered.length === 0) {
            setError('No results found');
          } else {
            setError(null);
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, username]);

  return [results, loading, error];
};
