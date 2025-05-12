"use client";
import { useState, useMemo } from "react";
import { Repo } from "@/app/types/repo";
import { RepositoryCard } from "./repo-card";

type Props = {
  repos: Repo[];
};

export const RepositoriesSection = ({ repos }: Props) => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("updated");
  const [type, setType] = useState("Type");
  const typeOptions = [
    "All",
    "Public",
    "Private",
    "Forks",
    "Archived",
    "Mirrors",
  ];

  const languages = useMemo(() => {
    const langs = new Set<string>();
    (Array.isArray(repos) ? repos : []).forEach(
      (r) => r.language && langs.add(r.language)
    );
    return ["All", ...Array.from(langs)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    const safeRepos = Array.isArray(repos) ? repos : [];
    let filtered = safeRepos.filter((repo) =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    );
    if (type !== "All") {
      if (type === "Public")
        filtered = filtered.filter((repo) => !repo.private);
      if (type === "Private")
        filtered = filtered.filter((repo) => repo.private);
      if (type === "Forks") filtered = filtered.filter((repo) => repo.fork);
      if (type === "Archived")
        filtered = filtered.filter((repo) => repo.archived);
      if (type === "Mirrors")
        filtered = filtered.filter((repo) => repo.mirror_url);
    }
    if (language !== "All") {
      filtered = filtered.filter((repo) => repo.language === language);
    }
    if (sort === "updated") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } else if (sort === "stars") {
      filtered = filtered.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
    }
    return filtered;
  }, [repos, search, type, language, sort]);

  return (
    <section className="ml-0 md:ml-8 flex-1">
      <h2 className="text-xl font-bold text-white mb-4">
        Repositories ({repos.length})
      </h2>

      <div className="flex md:items-start gap-2 mb-4">
        <input
          type="text"
          placeholder="Find a repository"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#0d1117] border border-gray-700 rounded px-3 py-1 text-white flex-1"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#0d1117] border border-gray-700 rounded px-2 py-1 text-white"
        >
          {typeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#0d1117] border border-gray-700 rounded px-2 py-1 text-white"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#0d1117] border border-gray-700 rounded px-2 py-1 text-white"
        >
          <option value="updated">Recently updated</option>
          <option value="stars">Most stars</option>
        </select>
      </div>
      <div>
        {filteredRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};
