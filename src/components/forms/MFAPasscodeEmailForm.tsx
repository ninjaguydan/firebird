import React, { FormEvent } from "react";

import SvgSuccess from "assets/icons/SvgSuccess";

import ResentCode from "src/components/common/resentCode/ResentCode";
import MultiInput from "src/components/inputs/multiInput/MultiInput";

import { hideEmail } from "src/utils/helpers/formatters";
import { IDevice } from "src/utils/interfaces/auth/IMFA";

type PasscodeFormProps = {
  setCode: (code: string | null) => void;
  code: string | null;
  loginMfaStatus?: "NEW" | "EXISTING";
  defaultCode: string | undefined;
  email: string | undefined;
  handleResend: (e: any) => void;
  resentPasscode: boolean;
  devicesForAuth?: IDevice[];
  handleChangeMethod: () => void;
  handleChangeEmail?: () => void;
  onFinish: (e: FormEvent<HTMLElement>) => void | Promise<void>;
  passCodeError: string;
  onRedirect?: () => void;
  mfaHistory?: "NEW" | "EXISTING" | "EDIT";
};

export default function MFAPasscodeEmailForm({
  setCode,
  code,
  loginMfaStatus,
  defaultCode,
  email,
  handleResend,
  resentPasscode,
  devicesForAuth,
  handleChangeMethod,
  handleChangeEmail,
  onFinish,
  passCodeError,
  onRedirect,
  mfaHistory,
}: PasscodeFormProps) {
  return (
    <form className="method-content" onSubmit={(e) => onFinish(e)}>
      <p className="device-subheader">Enter the passcode you received to complete authentication</p>
      <MultiInput getCode={setCode} defaultNum={defaultCode} error={passCodeError} />
      <div>
        <p>Email sent to:</p>
        <p className="user-contact">{hideEmail(email || "wwhite@wynnehs.edu")}</p>
      </div>
      <div className="link-text-group">
        {handleChangeEmail && (
          <>
            <button className="btn-nest ghost" type="button" onClick={handleChangeEmail}>
              Change email
            </button>
            <div className="vr"></div>
          </>
        )}
        {resentPasscode ? (
          <ResentCode />
        ) : (
          <button type="button" onClick={(e) => handleResend(e)} className="btn-nest ghost">
            {!handleChangeEmail && <span>Didn&apos;t recieve a code? </span>}
            Resend code
          </button>
        )}
      </div>
      <div className="btn-group">
        {devicesForAuth && devicesForAuth.length > 1
          ? (loginMfaStatus === "EXISTING" || mfaHistory === "NEW") && (
              <button type="button" className="btn-nest secondary" onClick={handleChangeMethod}>
                Select different method
              </button>
            )
          : (mfaHistory === "NEW" || loginMfaStatus === "NEW") && (
              <button type="button" className="btn-nest secondary" onClick={handleChangeMethod}>
                Select different method
              </button>
            )}
        <button
          className="btn-nest primary submit"
          disabled={!code || passCodeError !== "" || resentPasscode}
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
