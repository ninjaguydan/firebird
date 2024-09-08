import React, { SVGProps } from "react";

const SvgCheck = ({ className, fill = "black" }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 5.97345L9.02655 20.9469L0 11.9204L2.97345 8.9469L9.02655 15L21.0265 3L24 5.97345Z"
      fill={fill}
    />
  </svg>
);

export default SvgCheck;
