import React from "react";

import "./NestSwitch.css";

type SwitchProps = {
  onToggle: () => void;
  ON: boolean;
  ariaLabel: string;
  disabled?: boolean;
};

export default function NestSwitch({
  onToggle,
  ON = false,
  ariaLabel,
  disabled = false,
}: SwitchProps) {
  return (
    <button
      onClick={onToggle}
      className={`nest-switch ${ON ? "ON" : "OFF"}`}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <span className="slider"></span>
    </button>
  );
}
