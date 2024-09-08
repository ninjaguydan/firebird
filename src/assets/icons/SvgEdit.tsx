import React, { SVGProps } from "react";

const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.8376 6.75748L13.1867 2.1613L14.7187 0.629239C15.1382 0.209746 15.6536 0 16.265 0C16.8756 0 17.3907 0.209746 17.8102 0.629239L19.3423 2.1613C19.7618 2.58079 19.9806 3.0871 19.9989 3.68023C20.0171 4.27262 19.8165 4.77857 19.397 5.19806L17.8376 6.75748ZM16.2508 8.37162L4.6509 19.9715H0V15.3206L11.5999 3.72072L16.2508 8.37162Z"
      fill={props.fill || "black"}
    />
  </svg>
);
export default SvgEdit;
