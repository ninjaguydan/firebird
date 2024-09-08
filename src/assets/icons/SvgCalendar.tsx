import React, { SVGProps } from "react";

const SvgCalendar = ({ className, fill = "black" }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none">
    <path
      d="M7.8665 9.6C7.63984 9.6 7.44997 9.5232 7.2969 9.3696C7.1433 9.21653 7.0665 9.02667 7.0665 8.8C7.0665 8.57333 7.1433 8.3832 7.2969 8.2296C7.44997 8.07653 7.63984 8 7.8665 8C8.09317 8 8.2833 8.07653 8.4369 8.2296C8.58997 8.3832 8.6665 8.57333 8.6665 8.8C8.6665 9.02667 8.58997 9.21653 8.4369 9.3696C8.2833 9.5232 8.09317 9.6 7.8665 9.6ZM4.6665 9.6C4.43984 9.6 4.2497 9.5232 4.0961 9.3696C3.94304 9.21653 3.8665 9.02667 3.8665 8.8C3.8665 8.57333 3.94304 8.3832 4.0961 8.2296C4.2497 8.07653 4.43984 8 4.6665 8C4.89317 8 5.0833 8.07653 5.2369 8.2296C5.38997 8.3832 5.4665 8.57333 5.4665 8.8C5.4665 9.02667 5.38997 9.21653 5.2369 9.3696C5.0833 9.5232 4.89317 9.6 4.6665 9.6ZM11.0665 9.6C10.8398 9.6 10.65 9.5232 10.4969 9.3696C10.3433 9.21653 10.2665 9.02667 10.2665 8.8C10.2665 8.57333 10.3433 8.3832 10.4969 8.2296C10.65 8.07653 10.8398 8 11.0665 8C11.2932 8 11.483 8.07653 11.6361 8.2296C11.7897 8.3832 11.8665 8.57333 11.8665 8.8C11.8665 9.02667 11.7897 9.21653 11.6361 9.3696C11.483 9.5232 11.2932 9.6 11.0665 9.6ZM7.8665 12.8C7.63984 12.8 7.44997 12.7232 7.2969 12.5696C7.1433 12.4165 7.0665 12.2267 7.0665 12C7.0665 11.7733 7.1433 11.5835 7.2969 11.4304C7.44997 11.2768 7.63984 11.2 7.8665 11.2C8.09317 11.2 8.2833 11.2768 8.4369 11.4304C8.58997 11.5835 8.6665 11.7733 8.6665 12C8.6665 12.2267 8.58997 12.4165 8.4369 12.5696C8.2833 12.7232 8.09317 12.8 7.8665 12.8ZM4.6665 12.8C4.43984 12.8 4.2497 12.7232 4.0961 12.5696C3.94304 12.4165 3.8665 12.2267 3.8665 12C3.8665 11.7733 3.94304 11.5835 4.0961 11.4304C4.2497 11.2768 4.43984 11.2 4.6665 11.2C4.89317 11.2 5.0833 11.2768 5.2369 11.4304C5.38997 11.5835 5.4665 11.7733 5.4665 12C5.4665 12.2267 5.38997 12.4165 5.2369 12.5696C5.0833 12.7232 4.89317 12.8 4.6665 12.8ZM11.0665 12.8C10.8398 12.8 10.65 12.7232 10.4969 12.5696C10.3433 12.4165 10.2665 12.2267 10.2665 12C10.2665 11.7733 10.3433 11.5835 10.4969 11.4304C10.65 11.2768 10.8398 11.2 11.0665 11.2C11.2932 11.2 11.483 11.2768 11.6361 11.4304C11.7897 11.5835 11.8665 11.7733 11.8665 12C11.8665 12.2267 11.7897 12.4165 11.6361 12.5696C11.483 12.7232 11.2932 12.8 11.0665 12.8ZM2.2665 16C1.8265 16 1.4497 15.8435 1.1361 15.5304C0.823037 15.2168 0.666504 14.84 0.666504 14.4V3.2C0.666504 2.76 0.823037 2.38347 1.1361 2.0704C1.4497 1.7568 1.8265 1.6 2.2665 1.6H3.0665V0H4.6665V1.6H11.0665V0H12.6665V1.6H13.4665C13.9065 1.6 14.2833 1.7568 14.5969 2.0704C14.91 2.38347 15.0665 2.76 15.0665 3.2V14.4C15.0665 14.84 14.91 15.2168 14.5969 15.5304C14.2833 15.8435 13.9065 16 13.4665 16H2.2665ZM2.2665 14.4H13.4665V6.4H2.2665V14.4Z"
      fill={fill}
    />
  </svg>
);

export default SvgCalendar;
