import React, { FormEvent } from "react";

import MultiInput from "src/components/inputs/multiInput/MultiInput";

import { IDevice } from "src/utils/interfaces/auth/IMFA";

type PasscodeFormProps = {
  setCode: (code: string | null) => void;
  code: string | null;
  defaultCode: string | undefined;
  passCodeError: string;
  devicesForAuth: IDevice[];
  handleChangeMethod: () => void;
  onFinish: (e: FormEvent) => void;
  onRedirect?: () => void;
};

export default function MFAPasscodeAppForm({
  setCode,
  code,
  defaultCode,
  passCodeError,
  devicesForAuth,
  handleChangeMethod,
  onFinish,
  onRedirect,
}: PasscodeFormProps) {
  return (
    <form className="method-content" onSubmit={(e) => onFinish(e)}>
      <p className="passcode-input-header">Enter the passcode displayed in your app to continue.</p>
      <MultiInput getCode={setCode} defaultNum={defaultCode} error={passCodeError} />

      <p className="passcode-input-message">Passcode sent to your authenticator app</p>
      <div className="btn-group">
        {devicesForAuth && devicesForAuth.length > 1 && (
          <button type="button" className="btn-nest secondary" onClick={handleChangeMethod}>
            Select Different Method
          </button>
        )}
        <button
          className="btn-nest primary"
          disabled={!code || passCodeError !== "" ? true : false}
        >
          Finish
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
