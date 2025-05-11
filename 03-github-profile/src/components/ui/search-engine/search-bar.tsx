import styles from './search-bar.module.css';

interface SearchEngineProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchEngine = ({ query, setQuery }: SearchEngineProps) => {
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
