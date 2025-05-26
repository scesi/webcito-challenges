'use client';
import { useState, useMemo } from 'react';
import { Repo } from '@/app/types/repo';
import { RepositoryCard } from './repo-card';
import { DropdownFilter } from './dropdown-filter';

type Props = {
  repos: Repo[];
};

export const RepositoriesSection = ({ repos }: Props) => {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('All');
  const [sort, setSort] = useState('Sort');
  const [type, setType] = useState('Type');
  const typeOptions = [
    'All',
    'Public',
    'Private',
    'Forks',
    'Archived',
    'Mirrors',
  ];

  const languages = useMemo(() => {
    const langs = new Set<string>();
    (Array.isArray(repos) ? repos : []).forEach(
      (r) => r.language && langs.add(r.language)
    );
    return ['All', ...Array.from(langs)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    const safeRepos = Array.isArray(repos) ? repos : [];
    let filtered = safeRepos.filter((repo) =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    );
    if (type !== 'All') {
      if (type === 'Public')
        filtered = filtered.filter((repo) => !repo.private);
      if (type === 'Private')
        filtered = filtered.filter((repo) => repo.private);
      if (type === 'Forks') filtered = filtered.filter((repo) => repo.fork);
      if (type === 'Archived')
        filtered = filtered.filter((repo) => repo.archived);
      if (type === 'Mirrors')
        filtered = filtered.filter((repo) => repo.mirror_url);
    }
    if (language !== 'All') {
      filtered = filtered.filter((repo) => repo.language === language);
    }
    if (sort === 'updated') {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } else if (sort === 'stars') {
      filtered = filtered.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
    }
    return filtered;
  }, [repos, search, type, language, sort]);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          Repositories{' '}
          <span className="text-white font-semibold">({repos.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
        <div className="relative md:col-span-7">
          <input
            type="text"
            placeholder="Find a repository"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d1117] border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1f6feb] focus:border-transparent h-[40px]"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="md:col-span-5 grid grid-cols-3 gap-3">
          <DropdownFilter
            value={type}
            setValue={setType}
            options={typeOptions}
            label="Type"
            placeholder="Type"
          />

          <DropdownFilter
            value={language}
            setValue={setLanguage}
            options={languages}
            label="Language"
            placeholder="Language"
          />
          <DropdownFilter
            value={sort}
            setValue={setSort}
            options={['updated', 'stars']}
            label="Sort"
            placeholder="Sort"
          />
        </div>
      </div>

      <div className="border-b border-[#30363d] mb-4"></div>

      <div className="space-y-4">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))
        ) : (
          <div className="p-8 text-center text-gray-400">
            <p>No repositories found.</p>
          </div>
        )}
      </div>
    </section>
  );
};
