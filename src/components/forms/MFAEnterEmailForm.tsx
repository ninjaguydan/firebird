import React from "react";

import { validateEmail } from "src/utils/validators/validators";

import NestInput from "../inputs/nestInput/NestInput";

type EmailEnterFormProps = {
  handleNext: (e: React.FormEvent<HTMLElement>) => void;
  handleCancel: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: boolean;
  errorMsg?: string;
  onRedirect?: () => void;
  mfaHistory?: "NEW" | "EXISTING" | "EDIT";
};

export default function MFAEnterEmailForm({
  handleNext,
  handleCancel,
  handleChange,
  value,
  error,
  errorMsg,
  onRedirect,
  mfaHistory,
}: EmailEnterFormProps) {
  return (
    <form onSubmit={(e) => handleNext(e)} className="method-content">
      <p className="device-subheader">
        Enter the email you would like to receive authentication codes with.
      </p>
      <ul>
        <li>Delivery for email can be slower than other methods</li>
        <li>Security Risk</li>
      </ul>
      <div className="nest-input-group">
        <NestInput
          label="Email"
          value={value}
          id="email"
          onChange={handleChange}
          autoFocus
          required
          type="email"
          error={errorMsg || validateEmail(value)}
        />
      </div>
      <div className="btn-group">
        {mfaHistory && mfaHistory === "EDIT" ? null : (
          <button type="button" className="btn-nest secondary" onClick={handleCancel}>
            Select Different Method
          </button>
        )}
        <button
          className="btn-nest primary submit"
          disabled={value === "" || value === null ? true : false}
        >
          Next
        </button>
      </div>
      {onRedirect && (
        <button type="button" onClick={onRedirect} className={"btn-nest ghost"}>
          Cancel
        </button>
      )}
    </form>
  );
}
