import React, { SVGProps } from "react";

const SvgFolder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.67442 20.8605C1.24651 20.8605 0.860465 20.6884 0.516279 20.3442C0.172093 20 0 19.614 0 19.186V4.67442C0 4.24651 0.172093 3.86047 0.516279 3.51628C0.860465 3.17209 1.24651 3 1.67442 3H9.51628L11.1907 4.67442H20.6512C21.0791 4.67442 21.4651 4.84651 21.8093 5.1907C22.1535 5.53488 22.3256 5.92093 22.3256 6.34884H1.67442V19.186L4.52093 8.02325H24L21.014 19.5767C20.9023 20.0233 20.6977 20.3488 20.4 20.5535C20.1023 20.7581 19.7209 20.8605 19.2558 20.8605H1.67442Z"
      fill={props.fill || "black"}
    />
  </svg>
);

export default SvgFolder;
