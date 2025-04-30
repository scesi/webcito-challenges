import { ArticleRepositories } from '@/components/articleRepositories';
import { textFont } from '@/config/fonts';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-[360px_1fr]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <aside className=" grid max-h-[60vh] ml-[80]">
        <Image
          src="/favicon.ico"
          alt="GitHub Logo"
          width={280}
          height={280}
          className="rounded-full"
        />
        <h2 className="mt-4 text-2xl font-bold">Alfredo Ronald</h2>
        <span className="mt-2 text-[var(--color-font)]"> alfredoronald</span>
        <div className="flex flex-row gap-2 my-4">
          <button className="border-solid border-1 rounded-lg bg-[var(--color-button)] cursor-pointer">
            <p className="flex px-10 py-1">
            Follow
            </p>
            </button>
          <button className="border-solid border-1 bg-[var(--color-button)] rounded-lg cursor-pointer ">
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
        <p>profesiones u ocupaciones</p>
        <article>
          <ol className="flex flex-col mt-2 gap-y-2 text-[var(--color-font)]">
          <li className='flex text-center gap-2'>
              <Image
                src="/icons/users.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
              />
              4,6k Followers  •  60 Following  •</li>
            <li className='flex text-center gap-2'>
              <Image
                src="/icons/star.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
              />
              45</li>
            <li className='flex text-center gap-2'>
              <Image
                src="/icons/location.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
              />
              Ciudad</li>
            <li className="flex text-center gap-2"><Image
                src="/icons/link.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
              />Page web</li>
            <li className="flex text-center gap-2"><Image
                src="/icons/twiter.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
              />Twiter</li>
          </ol>
        </article>
      </aside>
      <main className="">
        <h1 className={textFont.className} >Repositorios Nro encontrados</h1>
        <nav className='flex w-full gap-3 place-content-between py-8'>
          <input className='w-[300px] ' type="text" placeholder='Find a repository' />
          <ul className='flex gap-3'>

          <li className=''><button className='cursor-pointer'>Type</button></li>
          <li className=''><button className='cursor-pointer'>Language</button></li>
          <li className=''><button className='cursor-pointer'>Sort</button></li>
          </ul>
        </nav>
        <ArticleRepositories />
        <ArticleRepositories />
      </main>
      
    </div>
  );
}
