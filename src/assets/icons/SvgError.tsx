import React, { SVGProps } from "react";

const SvgError = ({ fill = "black", className }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="90"
    height="90"
    viewBox="0 0 90 90"
    data-testid="svg-error"
    fill={fill}>
    <path
      d="M26.25 90L0 63.75V26.25L26.25 0H63.75L90 26.25V63.75L63.75 90H26.25ZM45 70C46.4167 70 47.605 69.52 48.565 68.56C49.5217 67.6033 50 66.4167 50 65C50 63.5833 49.5217 62.395 48.565 61.435C47.605 60.4783 46.4167 60 45 60C43.5833 60 42.3967 60.4783 41.44 61.435C40.48 62.395 40 63.5833 40 65C40 66.4167 40.48 67.6033 41.44 68.56C42.3967 69.52 43.5833 70 45 70ZM40 50H50V20H40V50Z"
      fill={fill}
    />
  </svg>
);

export default SvgError;
