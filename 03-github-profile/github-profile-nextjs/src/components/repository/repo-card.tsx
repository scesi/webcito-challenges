import { Repo } from "@/app/types/repo";
import { FiStar } from "react-icons/fi";
import { GoRepoForked } from "react-icons/go";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Sparkline } from "./sparkline";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

export const RepositoryCard = ({ repo }: { repo: Repo }) => {
  const [activity, setActivity] = useState<number[] | null>(null);

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
    <div className="flex flex-row justify-between items-start bg-[#161b22] rounded-lg p-4 mb-4 border border-[#21262d]">
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
            {repo.private ? "Private" : "Public"}
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
              className="bg-[#21262d] text-gray-300 px-2 py-0.5 rounded text-xs"
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
                  backgroundColor: languageColors[repo.language] || "#ccc",
                }}
              ></span>
              {repo.language}
            </span>
          )}
          {/* Estrellas */}
          <span className="flex items-center gap-1">
            <FiStar /> {repo.stargazers_count}
          </span>
          {/* Forks */}
          <span className="flex items-center gap-1">
            <GoRepoForked /> {repo.forks_count}
          </span>
          <span>
            Updated{" "}
            {formatDistanceToNow(new Date(repo.updated_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end min-w-[80px] ml-4">
        <button className="flex items-center gap-1 bg-[#21262d] hover:bg-[#30363d] text-gray-200 px-4 py-2 rounded-lg border border-[#30363d] font-medium mb-2">
          <FiStar /> Star
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
