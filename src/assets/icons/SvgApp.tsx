import React, { SVGProps } from "react";

const SvgApp = ({ className, fill = "black" }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="36"
    height="37"
    viewBox="0 0 36 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_9366_5318)">
      <path
        d="M23.25 2H11.25C9.18 2 7.5 3.68 7.5 5.75V31.25C7.5 33.32 9.18 35 11.25 35H23.25C25.32 35 27 33.32 27 31.25V5.75C27 3.68 25.32 2 23.25 2ZM17.25 33.5C16.005 33.5 15 32.495 15 31.25C15 30.005 16.005 29 17.25 29C18.495 29 19.5 30.005 19.5 31.25C19.5 32.495 18.495 33.5 17.25 33.5ZM24 27.5H10.5V6.5H24V27.5Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_9366_5318">
        <rect width="36" height="36" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgApp;
