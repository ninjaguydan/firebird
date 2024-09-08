import React, { SVGProps } from "react";

const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.4 2.4H21.6V16.8H3.804L2.4 18.204V2.4ZM2.4 0C1.08 0 0.012 1.08 0.012 2.4L0 24L4.8 19.2H21.6C22.92 19.2 24 18.12 24 16.8V2.4C24 1.08 22.92 0 21.6 0H2.4ZM4.8 12H19.2V14.4H4.8V12ZM4.8 8.4H19.2V10.8H4.8V8.4ZM4.8 4.8H19.2V7.2H4.8V4.8Z"
      fill={props.fill || "black"}
    />
  </svg>
);

export default SvgMessage;
