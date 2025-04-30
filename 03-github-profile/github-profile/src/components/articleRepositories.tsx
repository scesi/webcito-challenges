import Image from "next/image";

export function ArticleRepositories() {
    return (
      <div>
          <hr />
          <div className="flex flex-row justify-between items-center mt-4">
          <h2 className="text-[var(--color-title-card)] font-bold text-xl">Name del repository <span>Public</span></h2>
          <button className="bg-[var(--color-button)] rounded-lg cursor-pointer text-center px-4 py-2">
            <p className="flex text-center gap-1">

            <Image
              src="/icons/star.svg"
              alt="GitHub Logo"
              width={24}
              height={24} 
            />
            Star
            </p>
          </button>
          </div>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non sint numquam veritatis distinctio illo atque. Hic, ipsa deserunt nihil cumque amet aspernatur cum impedit necessitatibus. Voluptates et temporibus totam corporis.</p>
          <span>leguanjes utilizados</span>
      </div>
    );
  }