import React, { SVGProps } from "react";

const SvgLogin = ({ className, fill = "black" }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.94804 20V17.528H17.528V2.47197H9.94804V0H17.528C18.2123 0 18.7953 0.240938 19.2772 0.722814C19.7591 1.20469 20 1.78774 20 2.47197V17.528C20 18.2123 19.7591 18.7953 19.2772 19.2772C18.7953 19.7591 18.2123 20 17.528 20H9.94804ZM7.57353 15.7447L5.86511 13.9677L8.59688 11.236H0V8.76403H8.59688L5.86511 6.03225L7.57353 4.25533L13.3117 10L7.57353 15.7447Z"
      fill={fill}
    />
  </svg>
);
export default SvgLogin;
