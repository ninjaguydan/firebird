import React, { SVGProps } from "react";

const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={props.className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="arrows">
      <path
        id="Vector"
        d="M6 12L0 6L6 0L7.06875 1.05L2.86875 5.25H12V6.75H2.86875L7.06875 10.95L6 12Z"
        fill="#565454"
      />
    </g>
  </svg>
);

export default SvgArrow;
