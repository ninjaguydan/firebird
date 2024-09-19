import React from "react";

import "./nest-checkbox.css";

type CheckboxProps = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label?: string;
  disabled?: boolean;
};

export default function NestCheckbox({
  onChange,
  checked,
  label,
  id,
  disabled = false,
}: CheckboxProps) {
  return (
    <label htmlFor={id} className={`nest-checkbox ${label ? "w-label" : ""}`}>
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} id={id} disabled={disabled} />
      <span className="checkmark"></span>
    </label>
  );
}
