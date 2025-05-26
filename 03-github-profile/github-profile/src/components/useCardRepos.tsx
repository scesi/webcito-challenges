'use client';
import { useGithubProfile } from '@/hooks/useGithubProfile';
import { textFont } from '@/config/fonts';
import { ArticleRepositories } from './articleRepositories';
import { ProfileAside } from './profileAside';

interface Props {
  username: string;
}
export default function UseCard({ username }: Props) {
  const { user, repos, error } = useGithubProfile(username);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Cargando...</p>;

  return (
    <div
      className={`${textFont.className} w-fit mx-auto mt-6 font-semibold grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6 md:gap-20 text-[var(--color-font)]`}
    >
      <ProfileAside user={user} />

      <main className="grid grid-cols-1 w-full max-w-4xl">
        <h1
          className={`${textFont.className} font-semibold text-lg sm:text-xl mb-2`}
        >
          Repositorios ({user.public_repos})
        </h1>
        <nav className="flex items-center gap-2 flex-wrap my-4">
          <input
            className="flex-1 border-2 rounded-lg border-[var(--color-font)] px-4 py-1"
            type="text"
            placeholder="Find a repository"
          />

          <div className="flex items-center gap-2">
            <form className="flex-1" action="#">
              <select
                className="bg-[var(--color-button)] rounded-lg border-none px-2 py-2"
                name="lenguajes"
                id="lang"
              >
                <option value="selecciona">Type</option>
                <option value="all">All</option>
                <option value="sources">Sources</option>
                <option value="fork">Fork</option>
                <option value="archived">Archived</option>
                <option value="mirror">Mirror</option>
              </select>
            </form>

            <form className="flex-1" action="#">
              <select
                className="bg-[var(--color-button)] rounded-lg border-none px-2 py-2"
                name="lenguajes"
                id="lang"
              >
                <option value="selecciona">Lenguaje</option>
                <option value="javascript">JavaScript</option>
                <option value="php">PHP</option>
                <option value="java">Java</option>
                <option value="golang">Golang</option>
                <option value="python">Python</option>
                <option value="c#">C#</option>
                <option value="C++">C++</option>
                <option value="erlang">Erlang</option>
              </select>
            </form>

            <form className="flex-1" action="#">
              <select
                className="bg-[var(--color-button)] rounded-lg border-none px-2 py-2"
                name="lenguajes"
                id="lang"
              >
                <option value="selecciona">Sort</option>
                <option value="all">All</option>
              </select>
            </form>
          </div>
        </nav>

        {repos.length > 0 && (
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <ArticleRepositories
                  username={repo.name}
                  descripcion={repo.description}
                  framework={repo.language}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
