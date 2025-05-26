import { Profile } from '@/app/types/profile';
import { Repo } from '@/app/types/repo';
import { ActionsButtons } from '@/components/profile/actions-buttons';
import Avatar from '@/components/profile/avatar';
import HeaderProfile from '@/components/profile/header-profile';
import { InfoSocialProfile } from '@/components/profile/info-social-profile';
import { RepositoriesSection } from '@/components/repository/repo-section';

export const revalidate = 3600;

async function getProfileAndRepos(username: string) {
  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos`),
    // {
    //   login: 'ivancidev',
    //   id: 79385821,
    //   node_id: 'MDQ6VXNlcjc5Mzg1ODIx',
    //   avatar_url: 'https://avatars.githubusercontent.com/u/79385821?v=4',
    //   gravatar_id: '',
    //   url: 'https://api.github.com/users/ivancidev',
    //   html_url: 'https://github.com/ivancidev',
    //   followers_url: 'https://api.github.com/users/ivancidev/followers',
    //   following_url:
    //     'https://api.github.com/users/ivancidev/following{/other_user}',
    //   gists_url: 'https://api.github.com/users/ivancidev/gists{/gist_id}',
    //   starred_url:
    //     'https://api.github.com/users/ivancidev/starred{/owner}{/repo}',
    //   subscriptions_url: 'https://api.github.com/users/ivancidev/subscriptions',
    //   organizations_url: 'https://api.github.com/users/ivancidev/orgs',
    //   repos_url: 'https://api.github.com/users/ivancidev/repos',
    //   events_url: 'https://api.github.com/users/ivancidev/events{/privacy}',
    //   received_events_url:
    //     'https://api.github.com/users/ivancidev/received_events',
    //   type: 'User',
    //   user_view_type: 'public',
    //   site_admin: false,
    //   name: 'Ivan Herlan Herbas Zubieta',
    //   company: null,
    //   blog: '',
    //   location: 'Bolivia',
    //   email: null,
    //   hireable: null,
    //   bio: "👋 Hi, I'm a Systems Engineering student in UMSS, 💻 Junior Full-Stack Developer. ",
    //   twitter_username: '',
    //   public_repos: 56,
    //   public_gists: 0,
    //   followers: 15,
    //   following: 27,
    //   created_at: '2021-02-21T00:33:46Z',
    //   updated_at: '2025-05-17T14:58:09Z',
    // },
    // [
    //   {
    //     id: 777976818,
    //     name: 'ApiRest-con-Nestjs-TypeORM-Docker-y-PostgreSQL',
    //     html_url:
    //       'https://github.com/ivancidev/ApiRest-con-Nestjs-TypeORM-Docker-y-PostgreSQL',
    //     description: 'ApiRest con Nestjs, TypeORM, Docker y PostgreSQL',
    //     language: 'TypeScript',
    //     stargazers_count: 0,
    //     forks_count: 0,
    //     open_issues_count: 0,
    //     updated_at: '2025-05-17T14:58:09Z',
    //     topics: [],
    //     private: false,
    //     fork: false,
    //     archived: false,
    //     mirror_url: '',
    //     owner: {
    //       login: 'ivancidev',
    //       avatar_url: 'https://avatars.githubusercontent.com/u/79385821?v=4',
    //     },
    //   },
    // ],
  ]);

  const profile: Profile = await profileRes.json();
  const repos: Repo[] = await reposRes.json();
  return { profile, repos };
}

export async function generateStaticParams() {
  const usernames = ['ivancidev', 'octocat', 'gaearon'];
  return usernames.map((username) => {
    return {
      username,
    };
  });
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { profile, repos } = await getProfileAndRepos(username);

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-72 flex-shrink-0">
          <div className="md:sticky md:top-6 space-y-1">
            <div className="flex flex-col items-center md:items-start">
              <Avatar src={profile.avatar_url} alt={profile.name} />
              <div className="mt-4 text-center md:text-left">
                <HeaderProfile name={profile.name} userName={profile.login} />
              </div>
            </div>
            <ActionsButtons />
            <InfoSocialProfile profile={profile} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <RepositoriesSection repos={repos} />
        </div>
      </div>
    </div>
  );
}
