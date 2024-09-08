import React, { SVGProps } from "react";

const SvgRemove = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill={props.fill || "black"}
  >
    <path d="M200-440v-80h560v80H200Z" fill={props.fill || "black"} />
  </svg>
);

export default SvgRemove;
