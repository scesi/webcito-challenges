import { Repo } from '@/app/types/repo';
import { FiStar } from 'react-icons/fi';
import { GoRepoForked } from 'react-icons/go';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { Sparkline } from './sparkline';
import { StarIcon } from '../icons';

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  CSS: '#563d7c',
  HTML: '#e34c26',
};

export const RepositoryCard = ({ repo }: { repo: Repo }) => {
  const [activity, setActivity] = useState<number[] | null>(null);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/commit_activity`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const lastWeeks = data.slice(-10).map((week) => week.total);
          setActivity(lastWeeks);
        }
      });
  }, [repo.owner.login, repo.name]);
  return (
    <div className="flex flex-row justify-between items-start rounded-lg p-4 mb-3 border-b border-[#21262d]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <a
            href={repo.html_url}
            className="text-lg font-semibold text-blue-400 hover:underline truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.name}
          </a>
          <span className="ml-2 px-2 py-0.5 rounded border border-gray-600 text-xs text-gray-400">
            {repo.private ? 'Private' : 'Public'}
          </span>
          {repo.fork && (
            <span className="flex items-center gap-1 text-xs text-gray-400 ml-2">
              <GoRepoForked /> Fork
            </span>
          )}
        </div>
        {repo.description && (
          <p className="text-gray-400 text-sm mb-2 line-clamp-2">
            {repo.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {repo.topics?.map((topic) => (
            <span
              key={topic}
              className="bg-[#21262d] text-gray-300 px-2 py-0.5 rounded-lg text-xs"
            >
              {topic}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{
                  backgroundColor: languageColors[repo.language] || '#ccc',
                }}
              ></span>
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FiStar size={16} /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GoRepoForked size={16} /> {repo.forks_count}
          </span>
          <span>
            Updated{' '}
            {formatDistanceToNow(new Date(repo.updated_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end min-w-[80px] ml-4">
        <button
          onClick={() => setIsStarred(!isStarred)}
          className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-gray-200 px-4 rounded-lg border border-[#30363d] font-medium mb-2 h-[40px] transition-all duration-300 ease-in-out hover:scale-105"
        >
          <StarIcon
            className={`w-5 h-5 ${
              isStarred ? 'fill-yellow-400' : ''
            }`}
            stroke={isStarred ? '#FFD700' : '#8B949E'}
          />{' '}
          <p>Star</p>
        </button>
        <div className="w-20 h-8 flex items-end">
          {activity ? (
            <Sparkline data={activity} />
          ) : (
            <div className="w-full h-2 bg-gradient-to-r from-green-400/30 to-green-400/80 rounded"></div>
          )}
        </div>
      </div>
    </div>
  );
};
