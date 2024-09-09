import React, { useEffect, useState } from "react";

import SvgEye from "assets/icons/SvgEye";

import "src/components/inputs/nestInput/nest-input.css";

type Props = {
  label: string;
  value?: string | undefined;
  id: string;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  type?: string;
  className?: string;
  error?: string;
  minLength?: number;
  maxLength?: number;
  ref?: any;
  labelIcon?: JSX.Element;
  max?: string;
};
const handleType = (type: string, showPassword: boolean) => {
  if (type !== "password") return type;
  return showPassword ? "text" : "password";
};

export default function NestInput({
  label,
  value,
  id,
  onFocus,
  onChange,
  autoFocus = false,
  required = true,
  disabled = false,
  type = "text",
  className,
  error,
  minLength,
  maxLength,
  ref,
  labelIcon,
  max,
}: Props) {
  const Required = required ? <span className="required"> *</span> : null;
  const [emptyError, setEmptyError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (disabled) setEmptyError("");
  }, [disabled]);

  const handleBlur = () => {
    if (!required) return;
    return !value && setEmptyError(`${label} cannot be empty.`);
  };
  useEffect(() => {
    if (!value) return;
    if (value.trim().length > 0) setEmptyError("");
  }, [value]);

  return (
    <div
      data-testid="nest-form-group"
      className={`nest-form-group ${className} ${emptyError || error ? "error" : ""} ${value ? "filled" : ""}`}
    >
      {type === "password" && value !== "" && (
        <button
          type="button"
          className={"nest-input-icon"}
          onClick={handlePasswordToggle}
          title="Toggle Password"
        >
          <SvgEye slashed={!showPassword} />
        </button>
      )}
      <input
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        required={required}
        autoFocus={autoFocus}
        id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        type={handleType(type, showPassword)}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        max={max}
      />
      <label htmlFor={id}>
        {labelIcon && labelIcon}
        {label}
        {required && Required}
      </label>
      {(emptyError || error) && <small role="alert">{emptyError || error}</small>}
    </div>
  );
}
