import React, { SVGProps } from "react";

const SvgEmail = ({
  fill = "black",
  className,
  filled = false,
}: {
  className?: string;
  fill?: string;
  filled?: boolean;
}) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={
        filled
          ? "M2.4 21.2C1.74 21.2 1.1752 20.9652 0.7056 20.4956C0.2352 20.0252 0 19.46 0 18.8V4.4C0 3.74 0.2352 3.1752 0.7056 2.7056C1.1752 2.2352 1.74 2 2.4 2H21.6C22.26 2 22.8252 2.2352 23.2956 2.7056C23.7652 3.1752 24 3.74 24 4.4V18.8C24 19.46 23.7652 20.0252 23.2956 20.4956C22.8252 20.9652 22.26 21.2 21.6 21.2H2.4ZM12 12.8L21.6 6.8V4.4L12 10.4L2.4 4.4V6.8L12 12.8Z"
          : "M21.6 2.40002H2.4C1.08 2.40002 0.012 3.48002 0.012 4.80002L0 19.2C0 20.52 1.08 21.6 2.4 21.6H21.6C22.92 21.6 24 20.52 24 19.2V4.80002C24 3.48002 22.92 2.40002 21.6 2.40002ZM21.6 19.2H2.4V7.20003L12 13.2L21.6 7.20003V19.2ZM12 10.8L2.4 4.80002H21.6L12 10.8Z"
      }
      fill={fill}
    />
  </svg>
);

export default SvgEmail;
