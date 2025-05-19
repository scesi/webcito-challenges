import type { RepoData } from '@/src/types/repository';

import styles from './repo-card.module.css';
import { StarIcon } from '@components/ui/icons/star-icon';
import { ForkIcon } from '@/src/components/ui/icons/fork-icon';

interface RepoCardProps {
  repo: RepoData;
}

export function RepoCard({ repo }: RepoCardProps) {
 
console.log("hola",repo);
  return (
    <article className={styles.repoItem}>
      <div className={styles.repoHeader}>
        <h3 className={styles.repoName}>
          <a href={repo.url}>{repo.name}</a>
        </h3>
        <p className={styles.repoVisibility}>{repo.visibility}</p>
      </div>
      <p className={styles.repoDescription}>{repo.description}</p>
      {repo.topics && repo.topics.length > 0 && (
        <div className={styles.repoTopics}>
          {repo.topics.map((topic) => (
            <span key={topic} className={styles.repoTopic}>
              {topic}
            </span>
          ))}
        </div>
      )}
      <div className={styles.repoDetails}>
        <span className={styles.repoStat}>
          <p>{repo.language}</p>
        </span>
        <span className={styles.repoStat}>
          <StarIcon />
          <p>{repo.stars}</p>
        </span>
        <span className={styles.repoStat}>
          <ForkIcon />
          <p>{repo.forks}</p>
        </span>
      </div>
      <hr className={styles.separator} />
    </article>
  );
}
