import React from "react";

import MultiInput from "../inputs/multiInput/MultiInput";

type PhoneEnterFormProps = {
  handleNext: (e: React.FormEvent<HTMLElement>) => void;
  handleCancel: () => void;
  setValue: (code: string | null) => void;
  value: string | null;
  defaultNum?: string | undefined;
  error?: boolean;
  errorMsg?: string;
  onRedirect?: () => void;
  mfaHistory?: "NEW" | "EXISTING" | "EDIT";
};

export default function MFAPEnterPhoneForm({
  handleNext,
  handleCancel,
  setValue,
  value,
  defaultNum,
  error,
  errorMsg,
  onRedirect,
  mfaHistory,
}: PhoneEnterFormProps) {
  return (
    <form onSubmit={(e) => handleNext(e)} className="method-content">
      <p className="device-subheader">
        Enter the mobile number you would like to receive authentication codes with.
      </p>
      <div>
        <MultiInput
          length={10}
          phoneNum={true}
          getCode={setValue}
          error={errorMsg}
          defaultNum={defaultNum}
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
          disabled={value === null || value.length < 10 ? true : false}
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
