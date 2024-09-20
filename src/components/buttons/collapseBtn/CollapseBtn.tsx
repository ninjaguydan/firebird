import React, { SetStateAction } from "react";

import SvgChevron from "src/assets/icons/SvgChevron";

import "./collapse-btn.css";

type BtnProps = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<SetStateAction<boolean>>;
  withLabel?: boolean;
  labelText?: { open: string; closed: string };
  className?: string;
};

export default function CollapseBtn({
  isExpanded,
  setIsExpanded,
  withLabel = true,
  labelText = { open: "Collapse", closed: "Expand" },
  className = "",
}: BtnProps) {
  return (
    <button
      onClick={() => setIsExpanded((prev) => !prev)}
      className={`${isExpanded ? "open" : ""} collapse-btn ${className}`}
      title="collapse-btn"
    >
      {withLabel && (isExpanded ? labelText.open : labelText.closed)} <SvgChevron />
    </button>
  );
}
