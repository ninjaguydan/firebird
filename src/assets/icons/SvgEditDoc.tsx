import React, { SVGProps } from "react";

const SvgEditDoc = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2018_7228)">
      <path
        d="M2.8 24C2.32 24 1.9 23.82 1.54 23.46C1.18 23.1 1 22.68 1 22.2V1.8C1 1.32 1.18 0.9 1.54 0.54C1.9 0.18 2.32 0 2.8 0H13L20.2 7.2V13.14L11.8 21.54V24H2.8ZM13.6 24V22.29L19.69 16.23L21.43 17.88L15.31 24H13.6ZM22.24 17.07L20.53 15.39L21.49 14.46C21.67 14.3 21.885 14.22 22.135 14.22C22.385 14.22 22.59 14.3 22.75 14.46L23.14 14.88C23.32 15.06 23.41 15.275 23.41 15.525C23.41 15.775 23.32 15.99 23.14 16.17L22.24 17.07ZM11.8 8.4H18.4L11.8 1.8V8.4Z"
        fill={props.fill || "black"}
      />
    </g>
    <defs>
      <clipPath id="clip0_2018_7228">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgEditDoc;
