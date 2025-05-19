import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
}
export default function Avatar({ alt, src }: AvatarProps) {
  return (
    <div className="flex items-center justify-start">
      <Image
        src={src || "vercel.svg"}
        className="rounded-full border-gray-200 border-[1px] border-solid"
        alt={alt || "Avatar"}
        width={270}
        height={270}
        priority
      />
    </div>
  );
}
