import React, { SVGProps } from "react";

const SvgLife = ({ fill, className, width, height }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width={width || "24"}
    height={height || "22"}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="life" clipPath="url(#clip0_2483_48671)">
      <path
        id="Vector"
        d="M11 23.6667V13.3667H10.3333C8.91111 13.3667 7.57222 13.0944 6.31667 12.55C5.06111 12.0056 3.94444 11.2333 2.96667 10.2333C1.98889 9.23333 1.25 8.07778 0.75 6.76667C0.25 5.45556 0 4.08889 0 2.66667V0H2.6C3.97778 0 5.3 0.272222 6.56667 0.816667C7.83333 1.36111 8.96667 2.13333 9.96667 3.13333C10.7 3.88889 11.3056 4.73333 11.7833 5.66667C12.2611 6.6 12.6 7.58889 12.8 8.63333C12.9778 8.36667 13.1667 8.11111 13.3667 7.86667C13.5667 7.62222 13.7778 7.37778 14 7.13333C15 6.13333 16.1333 5.36111 17.4 4.81667C18.6667 4.27222 20 4 21.4 4H24V6.66667C24 8.08889 23.7333 9.45555 23.2 10.7667C22.6667 12.0778 21.9111 13.2333 20.9333 14.2333C19.9333 15.2333 18.8056 16 17.55 16.5333C16.2944 17.0667 14.9778 17.3333 13.6 17.3333H13V23.6667H11Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_2483_48671">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLife;
