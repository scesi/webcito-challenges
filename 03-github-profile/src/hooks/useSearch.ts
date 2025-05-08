import { useState, useEffect } from 'react';

interface Filters {
  language?: string;
  visibility?: 'public' | 'private';
  sortBy?: 'name-asc' | 'name-desc';
}

export const useSearch = (
  query: string,
  username: string,
  filters: Filters = {}
) => {
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
          let filtered = data.filter((item: any) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          );

          if (filters.language) {
            filtered = filtered.filter(
              (item: any) =>
                item.language &&
                item.language.toLowerCase() === filters.language?.toLowerCase()
            );
          }

          if (filters.visibility) {
            filtered = filtered.filter(
              (item: any) =>
                (filters.visibility === 'public' && !item.private) ||
                (filters.visibility === 'private' && item.private)
            );
          }

          if (filters.sortBy === 'name-asc') {
            filtered = filtered.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            );
          } else if (filters.sortBy === 'name-desc') {
            filtered = filtered.sort((a: any, b: any) =>
              b.name.localeCompare(a.name)
            );
          }

          setResults(filtered);
          setError(filtered.length === 0 ? 'No results found' : null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, username, JSON.stringify(filters)]);

  return [results, loading, error];
};
