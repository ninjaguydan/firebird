import React, { SVGProps } from "react";

const SvgNewTab = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1952_6853)">
      <path
        d="M2.2295 24C1.63934 24 1.12021 23.776 0.672125 23.3279C0.224037 22.8798 -6.67572e-06 22.3607 -6.67572e-06 21.7705V2.22951C-6.67572e-06 1.61749 0.224037 1.0929 0.672125 0.655738C1.12021 0.218579 1.63934 0 2.2295 0H11.3115V2.22951H2.2295V21.7705H21.7705V12.6885H24V21.7705C24 22.3607 23.7814 22.8798 23.3443 23.3279C22.9071 23.776 22.3825 24 21.7705 24H2.2295ZM8.9836 16.623L7.40983 15.0164L20.1967 2.22951H13.2787V0H24V10.7213H21.7705V3.83607L8.9836 16.623Z"
        fill={props.fill || "#1C1B1F"}
      />
    </g>
    <defs>
      <clipPath id="clip0_1952_6853">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgNewTab;
