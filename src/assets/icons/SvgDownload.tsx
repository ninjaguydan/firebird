import React, { SVGProps } from "react";

const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={props.className}
    id={props.id}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="download">
      <path
        id="Vector"
        d="M2.5 20C1.8125 20 1.22417 19.7554 0.735 19.2663C0.245 18.7763 0 18.1875 0 17.5V13.75H2.5V17.5H17.5V13.75H20V17.5C20 18.1875 19.7554 18.7763 19.2663 19.2663C18.7763 19.7554 18.1875 20 17.5 20H2.5ZM10 15L3.75 8.75L5.5 6.9375L8.75 10.1875V0H11.25V10.1875L14.5 6.9375L16.25 8.75L10 15Z"
        fill="#1B8576"
      />
    </g>
  </svg>
);

export default SvgDownload;
