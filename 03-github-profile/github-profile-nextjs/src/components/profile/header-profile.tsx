import { Inter } from 'next/font/google';
interface HeaderProfileProps {
  name: string;
  userName: string;
}

const roboto = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
export default function HeaderProfile({ name, userName }: HeaderProfileProps) {
  return (
    <header
      className={`${roboto.className} flex flex-col justify-start text-2xl mt-5 mb-5`}
    >
      <h2 className="font-semibold text-[26px] text-gray-200">{name}</h2>
      <p className="text-gray-400 text-[20px] mt-2">{userName}</p>
    </header>
  );
}
