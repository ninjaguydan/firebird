import React from "react";

import SvgSuccess from "assets/icons/SvgSuccess";

import MultiInput from "src/components/inputs/multiInput/MultiInput";

import { hidePhone } from "src/utils/helpers/formatters";
import { IDevice } from "src/utils/interfaces/auth/IMFA";

type PasscodeFormProps = {
  setCode: (code: string | null) => void;
  code: string | null;
  loginMfaStatus?: "NEW" | "EXISTING";
  defaultCode: string | undefined;
  phone: string | undefined;
  devicesForAuth?: IDevice[];
  handleResend: (e: any) => void;
  resentPasscode: boolean;
  handleChangeMethod: () => void;
  handleChangeNumber?: () => void;
  onFinish: (e: React.FormEvent<HTMLElement>) => void | Promise<void>;
  passCodeError: string;
  onRedirect?: () => void;
  mfaHistory?: "NEW" | "EXISTING" | "EDIT";
};

export default function MFAPasscodeVoiceForm({
  setCode,
  code,
  loginMfaStatus,
  defaultCode,
  phone,
  handleResend,
  resentPasscode,
  devicesForAuth,
  handleChangeMethod,
  handleChangeNumber,
  onFinish,
  passCodeError,
  onRedirect,
  mfaHistory,
}: PasscodeFormProps) {
  return (
    <form className="method-content" onSubmit={(e) => onFinish(e)}>
      <p className="device-subheader">
        Enter the passcode that you received to complete authentication pairing.
      </p>
      <MultiInput getCode={setCode} defaultNum={defaultCode} error={passCodeError} />
      <div>
        <p>Voice message sent to:</p>
        <p className="user-contact">{hidePhone(phone || "5058429918")}</p>
      </div>
      <div className="link-text-group">
        {handleChangeNumber && (
          <>
            <button className="btn-nest ghost" type="button" onClick={handleChangeNumber}>
              Change number
            </button>
            <div className="vr"></div>
          </>
        )}
        {resentPasscode ? (
          <div className="resend-otp-action">
            <SvgSuccess />
            <p>Another call has been made</p>
          </div>
        ) : (
          <button type="button" onClick={(e) => handleResend(e)} className="btn-nest ghost">
            {!handleChangeNumber && <span>Didn't recieve a code? </span>}Call again
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
