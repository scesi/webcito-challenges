import Image from "next/image";


interface ArticleRepositoriesProps {
  username: string;
  descripcion?: string;
  framework?: string;
}

export function ArticleRepositories({
  username,
  descripcion,
  framework
}: Readonly<ArticleRepositoriesProps>) {
  return (
    <div className="grid mb-6 w-full max-w-[1000px] sm:w-[90vw] md:w-[1000px] p-3 sm:p-4 border rounded-xl shadow-sm bg-[var(--color-bg-card)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
        <h2 className="text-[var(--color-title-card)] font-bold text-lg">
          {username}
          <span className="ml-2 text-amber-50 text-xs font-medium border-1 py-1 px-2 rounded-2xl">
            Public
          </span>
        </h2>
        <button className="flex items-center gap-2 bg-[var(--color-button)] text-white px-3 py-1.5 rounded-md hover:opacity-90 transition">
          <Image
            src="/icons/star.svg"
            alt="Star"
            width={20}
            height={20}
            className="flex"
          />
          <span>Star</span>
        </button>
      </div>

      {descripcion && (
        <p className="text-[14px] text-[var(--color-font)] mb-2">{descripcion}</p>
      )}
      

      {framework && (
        <span className="text-xs text-gray-400 ml-1.5">{framework}</span>
      )}
    </div>
  );
}
