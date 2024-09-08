import React from "react";

const SvgPolicy = ({ filled = false, className }: { filled?: boolean; className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d={
        filled
          ? "M11.6 24C8.8 23.3 6.5 21.675 4.7 19.125C2.9 16.575 2 13.78 2 10.74V3.6L11.6 0L21.2 3.6V10.74C21.2 13.78 20.3 16.575 18.5 19.125C16.7 21.675 14.4 23.3 11.6 24Z"
          : "M11.6 24C8.8 23.3 6.5 21.675 4.7 19.125C2.9 16.575 2 13.78 2 10.74V3.6L11.6 0L21.2 3.6V10.74C21.2 13.78 20.3 16.575 18.5 19.125C16.7 21.675 14.4 23.3 11.6 24ZM11.6 22.14C13.9 21.38 15.775 19.945 17.225 17.835C18.675 15.725 19.4 13.36 19.4 10.74V4.86L11.6 1.92L3.8 4.86V10.74C3.8 13.36 4.525 15.725 5.975 17.835C7.425 19.945 9.3 21.38 11.6 22.14Z"
      }
      fill="black"
    />
  </svg>
);
export default SvgPolicy;
