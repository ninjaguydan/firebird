import React, { SVGProps } from "react";

const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={props.className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="menu">
      <path
        id="Vector"
        d="M0 20V17.3333H24V20H0ZM0 13.3333V10.6667H24V13.3333H0ZM0 6.66667V4H24V6.66667H0Z"
        fill={props.fill || "#1C1B1F"}
      />
    </g>
  </svg>
);
export default SvgMenu;
