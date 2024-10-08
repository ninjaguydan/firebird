import React, { SVGProps } from "react";

const SvgFilter = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="12"
    height="11"
    viewBox="0 0 12 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.26643 11C5.05858 11 4.88436 10.9341 4.74376 10.8023C4.60316 10.6706 4.53286 10.5073 4.53286 10.3125V6.1875L0.149771 0.945312C-0.0213958 0.750521 -0.0458482 0.544271 0.0764137 0.326562C0.198675 0.108854 0.388181 0 0.644931 0H11.3551C11.6118 0 11.8013 0.108854 11.9236 0.326562C12.0458 0.544271 12.0214 0.750521 11.8502 0.945312L7.46714 6.1875V10.3125C7.46714 10.5073 7.39684 10.6706 7.25624 10.8023C7.11564 10.9341 6.94142 11 6.73357 11H5.26643Z"
      fill="black"
    />
  </svg>
);
export default SvgFilter;
