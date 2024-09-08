import React, { SVGProps } from "react";

const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.2857 24V13.7143H0V10.2857H10.2857V0H13.7143V10.2857H24V13.7143H13.7143V24H10.2857Z"
      fill={props.fill || "#1C1B1F"}
    />
  </svg>
);

export default SvgAdd;
