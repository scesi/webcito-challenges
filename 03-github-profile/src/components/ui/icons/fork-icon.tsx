import type { SVGProps } from 'react';

export const ForkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 2.59v10m10-5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m-10 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
        stroke="#8B949E"
        strokeWidth="1.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7.59a7.5 7.5 0 0 1-7.5 7.5"
        stroke="#8B949E"
        strokeWidth="1.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
