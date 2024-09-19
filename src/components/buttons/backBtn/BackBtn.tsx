import React from "react";

import SvgArrow from "assets/icons/SvgArrow";

import "src/components/buttons/backBtn/back-btn.css";

type BackBtnProps = {
  action: (...args: any) => void;
  className?: string;
};

export default function BackBtn({ action, className = "btn-nest ghost" }: BackBtnProps) {
  return (
    <button className={`back-btn ${className}`} onClick={action}>
      <SvgArrow /> Back
    </button>
  );
}
