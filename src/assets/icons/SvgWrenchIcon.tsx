import React, { SVGProps } from "react";

const SvgWrenchIcon = ({ fill = "black", className }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.3859 23.6349L10.8216 15.0041C10.3126 15.1812 9.8036 15.325 9.29461 15.4357C8.78561 15.5463 8.26556 15.6017 7.73444 15.6017C5.58783 15.6017 3.7621 14.8548 2.25726 13.361C0.75242 11.8672 0 10.047 0 7.90041C0 7.21438 0.08852 6.54495 0.26556 5.89212C0.4426 5.23928 0.697095 4.62517 1.02905 4.04979L5.84232 8.86307L8.89627 6.0083L3.95021 1.06224C4.52559 0.73029 5.13416 0.470263 5.77593 0.282158C6.4177 0.0940526 7.07054 0 7.73444 0C9.92531 0 11.7898 0.769018 13.3278 2.30705C14.8658 3.84509 15.6349 5.70954 15.6349 7.90041C15.6349 8.43153 15.5795 8.95159 15.4689 9.46058C15.3582 9.96957 15.2144 10.4786 15.0373 10.9876L23.6349 19.5519C23.8783 19.7953 24 20.0885 24 20.4315C24 20.7745 23.8783 21.0678 23.6349 21.3112L21.112 23.6349C20.8686 23.8783 20.5809 24 20.249 24C19.917 24 19.6293 23.8783 19.3859 23.6349Z"
      fill={fill}
    />
  </svg>
);

export default SvgWrenchIcon;
