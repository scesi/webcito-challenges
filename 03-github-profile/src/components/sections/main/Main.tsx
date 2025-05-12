import { useState } from 'react';
import type { RepoData } from '@/src/types/repository';

import { RepoCard } from './components/repo-card/repo-card';
import { SearchEngine } from '@components/ui/search-engine/search-bar';
import { SelectComponent } from '@components/ui/select-component/select-component';

import styles from './main.module.css';
import { useSearch } from '@/src/hooks/useSearch';

interface RepositoriesProps {
  repoCount: number;
  repoData: RepoData[];
  username?: string;
  query?: string;
}

const Repositories = ({
  repoCount,
  repoData,
  username = 'diegodev-01',
}: RepositoriesProps) => {
  const [query, setQuery] = useState('');
  const [results, loading, error] = useSearch(query, username);

  console.log(results);

  return (
    <main className={styles.repositories}>
      <h2 className={styles.repoTitle}>Repositories ({repoCount})</h2>
      <article className={styles.controls}>
        <SearchEngine query={query} setQuery={setQuery} />
        <SelectComponent
          label="Type"
          onChange={() => {}}
          options={[
            { value: 'as', label: 'All' },
            { value: 'ss  ', label: 'Sources' },
            { value: 'ds', label: 'Forks' },
            { value: 'ds', label: 'Archived' },
            { value: 'ds', label: 'Mirrors' },
          ]}
          value=""
        />
        <SelectComponent
          label="Language"
          onChange={() => {}}
          options={[
            { value: 'as', label: 'All' },
            { value: 'ss', label: 'CSS' },
            { value: 'ds', label: 'JavaScript' },
            { value: 'ds', label: 'Java' },
            { value: 'ds', label: 'HTML' },
          ]}
          value=""
        />
        <SelectComponent
          label="Sort"
          onChange={() => {}}
          options={[
            { value: 'ss', label: 'Name ↓' },
            { value: 'as', label: 'Name ↑' },
          ]}
          value=""
        />
      </article>
      <section className={styles.repoList}>
        {Array.isArray(results) &&
          results.map((repo, idx) => <RepoCard key={idx} repo={repo} />)}
      </section>
    </main>
  );
};

export default Repositories;
