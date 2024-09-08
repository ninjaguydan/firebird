import React, { SVGProps } from "react";

const SvgPhone = ({
  fill = "black",
  className,
  filled = false,
}: {
  fill?: string;
  className?: string;
  filled?: boolean;
}) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_9366_9411)">
      <path
        d={
          filled
            ? "M22.5 24C19.7889 24 17.0944 23.3333 14.4167 22C11.7389 20.6667 9.33333 18.9333 7.2 16.8C5.06667 14.6667 3.33333 12.2611 2 9.58333C0.666667 6.90556 0 4.21111 0 1.5C0 1.07778 0.144444 0.722222 0.433333 0.433333C0.722222 0.144444 1.07778 0 1.5 0H6.16667C6.47778 0 6.75 0.105556 6.98333 0.316667C7.21667 0.527778 7.36667 0.811111 7.43333 1.16667L8.33333 5.36667C8.37778 5.67778 8.37222 5.96111 8.31667 6.21667C8.26111 6.47222 8.14444 6.68889 7.96667 6.86667L4.63333 10.2333C5.87778 12.3 7.27222 14.1 8.81667 15.6333C10.3611 17.1667 12.1111 18.4667 14.0667 19.5333L17.2333 16.2667C17.4556 16.0222 17.7111 15.85 18 15.75C18.2889 15.65 18.5778 15.6333 18.8667 15.7L22.8333 16.5667C23.1667 16.6333 23.4444 16.8 23.6667 17.0667C23.8889 17.3333 24 17.6444 24 18V22.5C24 22.9222 23.8556 23.2778 23.5667 23.5667C23.2778 23.8556 22.9222 24 22.5 24Z"
            : "M4.72 2.66667C4.8 3.85333 5 5.01333 5.32 6.12L3.72 7.72C3.17333 6.12 2.82667 4.42667 2.70667 2.66667H4.72M17.8667 18.6933C19 19.0133 20.16 19.2133 21.3333 19.2933V21.28C19.5733 21.16 17.88 20.8133 16.2667 20.28L17.8667 18.6933M6 0H1.33333C0.6 0 0 0.6 0 1.33333C0 13.8533 10.1467 24 22.6667 24C23.4 24 24 23.4 24 22.6667V18.0133C24 17.28 23.4 16.68 22.6667 16.68C21.0133 16.68 19.4 16.4133 17.9067 15.92C17.7733 15.8667 17.6267 15.8533 17.4933 15.8533C17.1467 15.8533 16.8133 15.9867 16.5467 16.24L13.6133 19.1733C9.84 17.24 6.74667 14.16 4.82667 10.3867L7.76 7.45333C8.13333 7.08 8.24 6.56 8.09333 6.09333C7.6 4.6 7.33333 3 7.33333 1.33333C7.33333 0.6 6.73333 0 6 0Z"
        }
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_9366_9411">
        <rect width="36" height="36" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgPhone;
