"use client";
import {useGithubProfile} from "@/hooks/useGithubProfile";
import { textFont } from "@/config/fonts";
import { ArticleRepositories } from "./articleRepositories";
import { ProfileAside } from "./profileAside";

interface Props{
  username: string;
}
export default function UseCard({ username }:Props) {
   const { user, repos, error } = useGithubProfile(username);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Cargando...</p>;

  return (
    <div
      className={`${textFont.className}  mt-6 font-semibold grid grid-cols-1 md:grid md:grid-cols-[360px_1fr] gap-6 md:gap-20 w-full max-w-7xl ml-6 mr-6 text-[var(--color-font)]`}
    >
      <ProfileAside user={user} />
      <main className="grid grid-cols-1 w-full">
        <h1 className={`${textFont.className} font-semibold text-lg sm:text-xl mb-2`}>
          Repositorios ({user.public_repos})
        </h1>
        <nav className="grid grid-cols-1 sm:grid-cols-[660px_1fr] gap-2 sm:flex-row sm:items-center sm:gap-4 my-4 w-full ">
          <div className="w-full sm:w-full">
          <input
            className="w-full border-2 rounded-lg border-[var(--color-font)] px-4 py-2"
            type="text"
            placeholder="Find a repository"
          />
          </div>
          <div className="flex-1 ">
          <ul className="sm:grid-rows-[repeat(auto-fit,minmax(30px,1fr))] grid-cols-3  items-center grid gap-2 sm:gap-32">
            <li className=" ">
              <form action="#">
                <select
                  className=" bg-[var(--color-button)] rounded-lg border-none px-2 py-2"
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
            </li>
            <li className=" ">
              <form action="#">
                <select
                  className=" bg-[var(--color-button)] rounded-lg border-none px-2 py-2"
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
            </li>
            <li className=" ">
              <form action="#">
                <select
                  className="bg-[var(--color-button)] rounded-lg border-none px-2 py-2"
                  name="lenguajes"
                  id="lang"
                >
                  <option value="selecciona">Sort</option>
                  <option value="all">All</option>
                </select>
              </form>
            </li>
          </ul>
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
