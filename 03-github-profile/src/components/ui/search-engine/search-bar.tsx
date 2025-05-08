import { useSearch } from '@/src/hooks/useSearch';

import styles from './search-bar.module.css';
import { useState } from 'react';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('diegodev-01');
  const [results, loading, error] = useSearch(query, username);

  console.log('Results: ', results);
  console.log('query: ', query);

  return (
    <search className={styles.search}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find a repository"
        className={styles.input}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setQuery(e.currentTarget.value);
          }
        }}
      />
    </search>
  );
};
export default SearchEngine;
