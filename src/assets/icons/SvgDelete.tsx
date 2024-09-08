import React, { SVGProps } from "react";

const SvgDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    className={props.className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 24C4.26667 24 3.63911 23.7391 3.11733 23.2173C2.59467 22.6947 2.33333 22.0667 2.33333 21.3333V4H1V1.33333H7.66667V0H15.6667V1.33333H22.3333V4H21V21.3333C21 22.0667 20.7391 22.6947 20.2173 23.2173C19.6947 23.7391 19.0667 24 18.3333 24H5ZM7.66667 18.6667H10.3333V6.66667H7.66667V18.6667ZM13 18.6667H15.6667V6.66667H13V18.6667Z"
      fill={props.fill || "black"}
    />
  </svg>
);

export default SvgDelete;
