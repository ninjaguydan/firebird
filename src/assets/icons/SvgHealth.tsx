import React, { SVGProps } from "react";

const SvgHealth = ({ className, fill = "black" }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.2031 15.63H13.5469V12.63H16.4766V10.23H13.5469V7.23H11.2031V10.23H8.27344V12.63H11.2031V15.63ZM12.375 24C9.64062 23.3 7.39453 21.675 5.63672 19.125C3.87891 16.575 3 13.78 3 10.74V3.6L12.375 0L21.75 3.6V10.74C21.75 13.78 20.8711 16.575 19.1133 19.125C17.3555 21.675 15.1094 23.3 12.375 24Z"
      fill={fill}
    />
  </svg>
);
export default SvgHealth;
