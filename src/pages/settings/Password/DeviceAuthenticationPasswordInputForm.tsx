import React, { useEffect, useRef, useState } from "react";

import PING from "assets/images/image 1.png";
import SvgSuccess from "src/assets/icons/SvgSuccess";

import MultiInput from "src/components/inputs/multiInput/MultiInput";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { exitEditingStateConfirm } from "src/components/modals/confirmModal/modalContent";

import { IDevice } from "src/utils/interfaces/auth/IMFA";

type PasswordInputFormProps = {
  devicesForAuthentications: IDevice[];
  deviceSelectedForAuthentication?: IDevice;
  handleClose: () => void;
  handleSubmitDeviceAuthentication: (
    deviceForAuthentications: IDevice,
    deviceSelectionEndPoint: string,
    action?: string,
  ) => void;
  handleSubmitPasscode: (deviceSelectionEndPoint: string, passcode: string) => void;
  deviceSelectEndPoint: string;
  invalidPasscode: boolean;
  setInvalidPasscode: React.Dispatch<React.SetStateAction<boolean>>;
  resendOtpAction: boolean;
  setResendOtpAction: eact.Dispatch<React.SetStateAction<boolean>>;
  handleChooseAnotherDevice: () => void;
};

const DeviceAuthenticationPasswordInputForm = ({
  deviceSelectedForAuthentication,
  handleClose,
  devicesForAuthentications,
  handleSubmitPasscode,
  handleSubmitDeviceAuthentication,
  deviceSelectEndPoint,
  invalidPasscode,
  setInvalidPasscode,
  resendOtpAction,
  setResendOtpAction,
  handleChooseAnotherDevice,
}: PasswordInputFormProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [passcode, setPasscode] = useState<string | null>(null);
  const [defaultCode, setDefaultCode] = useState<undefined | "">(undefined);
  const [validationMessage, setValidationMessage] = useState("");
  const [showExitEditingConfirmPopup, setShowExitEditingConfirmPopup] = useState(false);

  useEffect(() => {
    if (resendOtpAction) {
      const timeoutId = setTimeout(() => {
        setResendOtpAction(false);
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [resendOtpAction]);

  useEffect(() => {
    if (!passcode) {
      setInvalidPasscode(false);
      setValidationMessage("");
    }
  }, [passcode]);

  const checkEditedState = () => {
    setShowExitEditingConfirmPopup(true);
  };

  const handleCancelAsBack = () => {
    handleResetFields();
    handleClose();
  };

  const handleResetFields = () => {
    setPasscode("");
    setDefaultCode((prev) => (prev === undefined ? "" : undefined));
    setInvalidPasscode(false);
    setValidationMessage("");
  };

  const handleResedPasscode = (action: string) => {
    handleResetFields();
    handleSubmitDeviceAuthentication(devicesForAuthentications[0], deviceSelectEndPoint, action);
  };

  const handleSubmit = () => {
    if (!passcode || passcode.trim() === "") {
      setValidationMessage("Passcode can't be empty!");
      return;
    }
    handleSubmitPasscode(deviceSelectEndPoint, passcode);
    setResendOtpAction(false);
  };

  const handleChangeDevice = () => {
    handleResetFields();
    handleChooseAnotherDevice();
  };

  useEffect(() => {
    if (passcode?.length === 6) {
      buttonRef.current!.focus();
    }
  }, [passcode, validationMessage]);

  return (
    <>
      <div className="mfa-header vertical">
        <img src={PING} alt="" className="mfa-logo" />
        <h3>Password Change</h3>
      </div>

      <div className="passcode-input-box">
        {deviceSelectedForAuthentication?.type === "TOTP" ? (
          <p className="passcode-input-header">
            Enter the passcode displayed in your app to continue.
          </p>
        ) : (
          <p className="passcode-input-header">
            Enter the passcode you received to complete authentication
          </p>
        )}
        <MultiInput getCode={setPasscode} defaultNum={defaultCode} />
        {invalidPasscode && <p className="passcode-input-invalid">Invalid code!</p>}
        {validationMessage !== "" && <p className="passcode-input-invalid">{validationMessage}</p>}

        {deviceSelectedForAuthentication?.type === "SMS" ? (
          <p className="passcode-input-message">
            Text message sent to: <br></br>
            <span className="passcode-input-device">{deviceSelectedForAuthentication?.phone}</span>
          </p>
        ) : deviceSelectedForAuthentication?.type === "EMAIL" ? (
          <p className="passcode-input-message">
            Email sent to: <br></br>
            <span className="passcode-input-device">{deviceSelectedForAuthentication?.email}</span>
          </p>
        ) : deviceSelectedForAuthentication?.type === "TOTP" ? (
          <p className="passcode-input-message">Passcode sent to your authenticator app</p>
        ) : (
          deviceSelectedForAuthentication?.type === "VOICE" && (
            <p className="passcode-input-message">
              Voice message sent to:<br></br>
              <span className="passcode-input-device">
                {deviceSelectedForAuthentication?.phone}
              </span>
            </p>
          )
        )}

        {devicesForAuthentications && devicesForAuthentications.length > 1 ? (
          deviceSelectedForAuthentication?.type === "TOTP" ? (
            <button onClick={handleChangeDevice} className="btn-nest ghost">
              Change method
            </button>
          ) : (
            <>
              <div className="link-text-group">
                <button onClick={handleChangeDevice} className="btn-nest ghost">
                  Change method
                </button>
                <div className="vr"></div>
                {resendOtpAction ? (
                  <div className="resend-otp-action">
                    <SvgSuccess />
                    <p>Another code has been sent</p>
                  </div>
                ) : (
                  <button className="btn-nest ghost" onClick={() => handleResedPasscode("send")}>
                    {deviceSelectedForAuthentication?.type === "VOICE"
                      ? "Call again"
                      : "Resend code"}
                  </button>
                )}
              </div>
            </>
          )
        ) : deviceSelectedForAuthentication?.type === "TOTP" ? (
          <></>
        ) : (
          <>
            <button className="btn-nest ghost" onClick={() => handleResedPasscode("resend")}>
              Resend code
            </button>
          </>
        )}
      </div>
      <div className="btn-group">
        <button className="btn-nest secondary" onClick={checkEditedState}>
          Cancel
        </button>
        <button
          ref={buttonRef}
          className="btn-nest primary"
          onClick={handleSubmit}
          disabled={
            validationMessage !== "" ||
            passcode === "" ||
            passcode == null ||
            passcode === undefined ||
            invalidPasscode
          }
        >
          Verify
        </button>
      </div>
      <ConfirmModal
        isOpen={showExitEditingConfirmPopup}
        onClose={() => setShowExitEditingConfirmPopup(false)}
        onConfirm={handleCancelAsBack}
        content={exitEditingStateConfirm}
      />
    </>
  );
};

export default DeviceAuthenticationPasswordInputForm;
