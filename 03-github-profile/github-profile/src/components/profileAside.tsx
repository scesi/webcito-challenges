import Image from "next/image";
import {GitHubUser} from "@/interfaces/gitHubUser";
interface ProfileAsideProps {
  user: GitHubUser;
}

export function ProfileAside({ user }: ProfileAsideProps) {
  return (
    <aside className="grid grid-cols-1 max-h-[600px] md:h-[100px] ml-0 md:ml-[80px]">
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={240}
        height={240}
        className="rounded-full mx-auto"
      />
      <h2 className="text-xl font-semibold mt-2">{user.login}</h2>
      <span className="text-[var(--color-font)] mt-2">{user.name}</span>
      <div className="flex flex-row gap-2 my-4">
        <button className="border-solid border-1 rounded-lg bg-[var(--color-button)] cursor-pointer">
          <p className="flex px-10 py-1">Follow</p>
        </button>
        <button className="border-solid border-1 bg-[var(--color-button)] rounded-lg cursor-pointer">
          <p className="flex text-center px-8 py-1 gap-1">
            <Image
              src="/icons/corazon.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              className="rounded-full"
            />
            Sponsor
          </p>
        </button>
      </div>
      <p className="text-gray-600 ">{user.bio}</p>
      <article>
        <ol className="flex flex-col mt-2 gap-y-2 text-[var(--color-font)]">
          <li className="flex text-center gap-2">
            <Image src="/icons/users.svg" alt="GitHub Logo" width={24} height={24} />
            {user.followers} Followers • {user.following} Following
          </li>
          <li className="flex text-center gap-2">
            <Image src="/icons/star.svg" alt="GitHub Logo" width={24} height={24} />
            0
          </li>
          <li className="flex text-center gap-2">
            <Image src="/icons/location.svg" alt="GitHub Logo" width={24} height={24} />
            {user.location}
          </li>
          <li className="flex text-center gap-2">
            <Image src="/icons/link.svg" alt="GitHub Logo" width={24} height={24} />
            {user.blog || user.html_url}
          </li>
          <li className="flex text-center gap-2">
            <Image src="/icons/twiter.svg" alt="GitHub Logo" width={24} height={24} />
            {user.twitter_username}
          </li>
        </ol>
      </article>
    </aside>
  );
}