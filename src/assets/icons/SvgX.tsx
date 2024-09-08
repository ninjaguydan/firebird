import React, { SVGProps } from "react";

const SvgX = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5775 7.9111H8.68047L17.4127 20.1336H19.3102L10.5775 7.9111Z" fill="black" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28ZM20.5459 7L15.3333 12.9287L21 21H16.8308L13.0135 15.5636L8.2348 21H7L12.4661 14.7836L7 7H11.1692L14.7831 12.1468L19.3111 7H20.5459Z"
      fill="black"
    />
  </svg>
);

export default SvgX;
