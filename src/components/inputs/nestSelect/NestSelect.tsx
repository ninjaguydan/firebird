import React, { useEffect, useState } from "react";

type Props = {
  label: string;
  options: string[];
  value: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  error?: string;
};

export default function NestSelect({
  label,
  options,
  value,
  id,
  onChange,
  required = true,
  className,
  error,
}: Props) {
  const Required = required ? <span className="required">*</span> : <></>;
  const [emptyError, setEmptyError] = useState("");
  const [isIOSDevices, setIsIOSDevices] = useState(false);
  const handleBlur = () => {
    if (!required) return;
    return !value ? setEmptyError(`${label} cannot be empty.`) : setEmptyError("");
  };

  const isIOS = () => {
    return typeof navigator !== "undefined" && /iPad|iPhone|/.test(navigator.userAgent);
  };
  useEffect(() => {
    setIsIOSDevices(isIOS());
  }, []);

  return (
    <div
      data-testid="nest-form-group"
      className={`nest-form-group ${className} ${emptyError || error ? "error" : ""} ${value ? "filled" : ""}`}
    >
      <select required={required} id={id} value={value} onChange={onChange} onBlur={handleBlur}>
        <option value="" disabled={isIOSDevices} hidden>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <label htmlFor={id}>
        {label} {Required}
      </label>
      {(emptyError || error) && <small role="alert">{emptyError || error}</small>}
    </div>
  );
}
