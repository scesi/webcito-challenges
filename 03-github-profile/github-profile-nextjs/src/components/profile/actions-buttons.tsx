'use client';
import { useState } from 'react';
import HeartIcon from '../icons/heart-icon';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const ActionsButtons = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSponsored, setIsSponsored] = useState(false);

  return (
    <section
      className={`${inter.className} items-center justify-center gap-4 flex text-[14px]`}
    >
      <button
        onClick={() => setIsFollowing(!isFollowing)}
        className={`py-2 w-full bg-[#22262C] ${
          isFollowing ? 'border-gray-300 border-[1px]' : ''
        } rounded-lg h-[32px] flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-105`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
      <button
        onClick={() => setIsSponsored(!isSponsored)}
        className={`py-2 w-full bg-[#22262C] ${
          isSponsored ? 'border-gray-300 border-[1px]' : ''
        } rounded-lg h-[32px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:scale-105`}
      >
        <HeartIcon
          className={`w-5 h-5 ${
            isSponsored
              ? 'fill-pink-500 scale-110'
              : 'scale-100 hover:fill-pink-400'
          }`}
        />
        <span
          className={`transition-opacity duration-500 ${
            isSponsored ? 'opacity-100' : 'opacity-80'
          }`}
        >
          {isSponsored ? 'Unsponsor' : 'Sponsor'}
        </span>
      </button>
    </section>
  );
};
