import React, { SVGProps } from "react";

const SvgHome = ({ className, filled = false }: { className?: string; filled?: boolean }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="Icon">
      <path
        id="Vector"
        d={
          filled
            ? "M0.299805 24V8L10.9665 0L21.6331 8V24H13.6331V14.6667H8.2998V24H0.299805Z"
            : "M3.2998 22H8.2998V13.6667H15.6331V22H20.6331V9L11.9665 2.5L3.2998 9V22ZM1.2998 24V8L11.9665 0L22.6331 8V24H13.6331V15.6667H10.2998V24H1.2998Z"
        }
        fill="black"
      />
    </g>
  </svg>
);
export default SvgHome;
