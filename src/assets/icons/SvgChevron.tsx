import React, { SVGProps } from "react";

const SvgChevron = ({ className, fill = "black" }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17 24L5 12L17 0L19.8 2.8L10.6 12L19.8 21.2L17 24Z" fill={fill} />
  </svg>
);
export default SvgChevron;
