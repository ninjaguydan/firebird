import React from "react";

const SvgSettings = ({ filled = false, className }: { filled?: boolean; className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="settings">
      <path
        id="Vector"
        d={
          filled
            ? "M8.71642 23.8806L8.23881 20.0597C7.9801 19.9602 7.73652 19.8408 7.50806 19.7015C7.27881 19.5622 7.05473 19.4129 6.83582 19.2537L3.28358 20.7463L0 15.0746L3.07463 12.7463C3.05473 12.607 3.04478 12.4724 3.04478 12.3427C3.04478 12.2137 3.04478 12.0796 3.04478 11.9403C3.04478 11.801 3.04478 11.6665 3.04478 11.5367C3.04478 11.4078 3.05473 11.2736 3.07463 11.1343L0 8.80597L3.28358 3.13433L6.83582 4.62687C7.05473 4.46766 7.28358 4.31841 7.52239 4.1791C7.76119 4.0398 8 3.9204 8.23881 3.8209L8.71642 0H15.2836L15.7612 3.8209C16.0199 3.9204 16.2639 4.0398 16.4931 4.1791C16.7216 4.31841 16.9453 4.46766 17.1642 4.62687L20.7164 3.13433L24 8.80597L20.9254 11.1343C20.9453 11.2736 20.9552 11.4078 20.9552 11.5367C20.9552 11.6665 20.9552 11.801 20.9552 11.9403C20.9552 12.0796 20.9552 12.2137 20.9552 12.3427C20.9552 12.4724 20.9353 12.607 20.8955 12.7463L23.9701 15.0746L20.6866 20.7463L17.1642 19.2537C16.9453 19.4129 16.7164 19.5622 16.4776 19.7015C16.2388 19.8408 16 19.9602 15.7612 20.0597L15.2836 23.8806H8.71642ZM12.0597 16.1194C13.2139 16.1194 14.199 15.7114 15.0149 14.8955C15.8308 14.0796 16.2388 13.0945 16.2388 11.9403C16.2388 10.7861 15.8308 9.80099 15.0149 8.98507C14.199 8.16915 13.2139 7.76119 12.0597 7.76119C10.8856 7.76119 9.89532 8.16915 9.08896 8.98507C8.28338 9.80099 7.8806 10.7861 7.8806 11.9403C7.8806 13.0945 8.28338 14.0796 9.08896 14.8955C9.89532 15.7114 10.8856 16.1194 12.0597 16.1194Z"
            : "M9.24 24L8.64 20.22C8.26 20.08 7.86 19.89 7.44 19.65C7.02 19.41 6.65 19.16 6.33 18.9L2.79 20.52L0 15.6L3.24 13.23C3.2 13.05 3.175 12.845 3.165 12.615C3.155 12.385 3.15 12.18 3.15 12C3.15 11.82 3.155 11.615 3.165 11.385C3.175 11.155 3.2 10.95 3.24 10.77L0 8.4L2.79 3.48L6.33 5.1C6.65 4.84 7.02 4.59 7.44 4.35C7.86 4.11 8.26 3.93 8.64 3.81L9.24 0H14.76L15.36 3.78C15.74 3.92 16.145 4.105 16.575 4.335C17.005 4.565 17.37 4.82 17.67 5.1L21.21 3.48L24 8.4L20.76 10.71C20.8 10.91 20.825 11.125 20.835 11.355C20.845 11.585 20.85 11.8 20.85 12C20.85 12.2 20.845 12.41 20.835 12.63C20.825 12.85 20.8 13.06 20.76 13.26L24 15.6L21.21 20.52L17.67 18.9C17.35 19.16 16.985 19.415 16.575 19.665C16.165 19.915 15.76 20.1 15.36 20.22L14.76 24H9.24ZM12 15.9C13.08 15.9 14 15.52 14.76 14.76C15.52 14 15.9 13.08 15.9 12C15.9 10.92 15.52 10 14.76 9.24C14 8.48 13.08 8.1 12 8.1C10.92 8.1 10 8.48 9.24 9.24C8.48 10 8.1 10.92 8.1 12C8.1 13.08 8.48 14 9.24 14.76C10 15.52 10.92 15.9 12 15.9ZM12 14.1C11.42 14.1 10.925 13.895 10.515 13.485C10.105 13.075 9.9 12.58 9.9 12C9.9 11.42 10.105 10.925 10.515 10.515C10.925 10.105 11.42 9.9 12 9.9C12.58 9.9 13.075 10.105 13.485 10.515C13.895 10.925 14.1 11.42 14.1 12C14.1 12.58 13.895 13.075 13.485 13.485C13.075 13.895 12.58 14.1 12 14.1ZM10.68 22.2H13.32L13.74 18.84C14.4 18.68 15.025 18.43 15.615 18.09C16.205 17.75 16.74 17.34 17.22 16.86L20.4 18.24L21.6 16.08L18.78 14.01C18.86 13.67 18.925 13.335 18.975 13.005C19.025 12.675 19.05 12.34 19.05 12C19.05 11.66 19.03 11.325 18.99 10.995C18.95 10.665 18.88 10.33 18.78 9.99L21.6 7.92L20.4 5.76L17.22 7.14C16.76 6.62 16.24 6.185 15.66 5.835C15.08 5.485 14.44 5.26 13.74 5.16L13.32 1.8H10.68L10.26 5.16C9.58 5.3 8.945 5.54 8.355 5.88C7.765 6.22 7.24 6.64 6.78 7.14L3.6 5.76L2.4 7.92L5.22 9.99C5.14 10.33 5.075 10.665 5.025 10.995C4.975 11.325 4.95 11.66 4.95 12C4.95 12.34 4.975 12.675 5.025 13.005C5.075 13.335 5.14 13.67 5.22 14.01L2.4 16.08L3.6 18.24L6.78 16.86C7.26 17.34 7.795 17.75 8.385 18.09C8.975 18.43 9.6 18.68 10.26 18.84L10.68 22.2Z"
        }
        fill="black"
      />
    </g>
  </svg>
);

export default SvgSettings;
