import { Roboto } from "next/font/google";
interface HeaderProfileProps {
  name: string;
  userName: string;
}

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});
export default function HeaderProfile({ name, userName }: HeaderProfileProps) {
  return (
    <header
      className={`${roboto.className} flex flex-col justify-start text-2xl mt-5 mb-5`}
    >
      <h2 className="font-bold text-gray-200">{name}</h2>
      <p className="text-gray-400 text-xl">{userName}</p>
    </header>
  );
}
