import React, { SVGProps } from "react";

const SvgBuilding = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 22.6V1H12V5.8H24V22.6H0ZM2.4 20.2H4.8V17.8H2.4V20.2ZM2.4 15.4H4.8V13H2.4V15.4ZM2.4 10.6H4.8V8.2H2.4V10.6ZM2.4 5.8H4.8V3.4H2.4V5.8ZM7.2 20.2H9.6V17.8H7.2V20.2ZM7.2 15.4H9.6V13H7.2V15.4ZM7.2 10.6H9.6V8.2H7.2V10.6ZM7.2 5.8H9.6V3.4H7.2V5.8ZM12 20.2H21.6V8.2H12V10.6H14.4V13H12V15.4H14.4V17.8H12V20.2ZM16.8 13V10.6H19.2V13H16.8ZM16.8 17.8V15.4H19.2V17.8H16.8Z"
      fill={props.fill || "black"}
    />
  </svg>
);
export default SvgBuilding;
