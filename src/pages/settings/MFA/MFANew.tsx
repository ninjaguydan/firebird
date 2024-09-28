import React, { FormEvent, SetStateAction, useEffect, useState } from "react";

import SvgApp from "assets/icons/SvgApp";
import SvgEmail from "assets/icons/SvgEmail";
import SvgMessage from "assets/icons/SvgMessage";
import SvgPhone from "assets/icons/SvgPhone";
import PING from "assets/images/image 1.png";

import MFAButton from "src/components/buttons/mfaBtn/MFAButton";
import MFAEnterEmailForm from "src/components/forms/MFAEnterEmailForm";
import MFAPEnterPhoneForm from "src/components/forms/MFAEnterPhoneForm";
import MFAPasscodeAppForm from "src/components/forms/MFAPasscodeAppForm";
import MFAPasscodeEmailForm from "src/components/forms/MFAPasscodeEmailForm";
import MFAPasscodeSMSForm from "src/components/forms/MFAPasscodeSMSForm";
import MFAPasscodeVoiceForm from "src/components/forms/MFAPasscodeVoiceForm";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { exitEditingStateConfirm } from "src/components/modals/confirmModal/modalContent";

import { DEVICE_TYPES, IMfaMethods } from "src/utils/interfaces/auth/IMFA";
import { validateEmail } from "src/utils/validators/validators";

import { SuccessType } from "../Settings";
import { LoginSecurityViews } from "../SettingsLoginSecurity";

type MFANew = {
  setView: React.Dispatch<SetStateAction<LoginSecurityViews>>;
  deviceAuthenticationEndpoint: string;
  setDeviceAuthenticationEndpoint: React.Dispatch<SetStateAction<string>>;
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorSubMsg: React.Dispatch<SetStateAction<string>>;
  setLoadingStep: React.Dispatch<SetStateAction<boolean>>;
  setSuccessType: React.Dispatch<SetStateAction<SuccessType>>;
};

export default function SettingsMFANew({
  setView,
  deviceAuthenticationEndpoint,
  setDeviceAuthenticationEndpoint,
  setShowSuccessModal,
  setShowErrorModal,
  setShowErrorSubMsg,
  setLoadingStep,
  setSuccessType,
}: MFANew) {
  const [method, setMethod] = useState<keyof IMfaMethods | undefined>();
  const [value, setValue] = useState<string | null>(null);

  const [passcode, setPasscode] = useState<string | null>(null);
  const [passcodeReady, setPasscodeReady] = useState(false);
  const [resentPasscode, setResentPasscode] = useState(false);
  const [defaultCode, setDefaultCode] = useState<string | undefined>();
  const [showExitEditingConfirmPopup, setShowExitEditingConfirmPopup] = useState(false);

  const [error, setError] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [secretValues, setSecretValues] = useState({});
  const [timeRemaining, setTimeRemaining] = useState<{
    minutes: string | number;
    seconds: string | number;
  } | null>(null);
  const [targetTimestamp, setTargetTimestamp] = useState(0);

  const onRedirect = () => {
    setShowExitEditingConfirmPopup(true);
  };

  const onCancelEdit = () => {
    deleteDeviceAction();
    setView("DEFAULT");
  };

  useEffect(() => {
    if (!passcode || !value) {
      setError(false);
      setErrorMsg("");
      setPasscodeError("");
    }
  }, [passcode, value]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value || !method) return;

    const isEmailMethod = method === "EMAIL";
    const isSmsOrVoiceMethod = method === "SMS" || method === "VOICE";

    let err = "";

    if (isEmailMethod) {
      err = validateEmail(value);
      setErrorMsg(err);
      setError(true);
      if (err) return;
    }
    handleCreateDevice("send");
  };

  function handleCreateDevice(action: string) {
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setPasscodeReady(true);
      if (action === "resend") {
        setErrorMsg("");
        setPasscode(null);
        setResentPasscode(true);
      }
    }, 1000);
  }

  const handleFinish = (e: FormEvent<Element>) => {
    e.preventDefault();
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setShowSuccessModal(true);
      setSuccessType("ADD_MFA_DEVICE");
      setDeviceAuthenticationEndpoint("");
      setView("DEFAULT");
    }, 1000);
  };

  const deleteDeviceAction = () => {
    setDeviceAuthenticationEndpoint("");
    setPasscodeReady(false);
    setResentPasscode(false);
  };

  const handleResendPasscode = () =>
    setDefaultCode((prev) => (prev === undefined ? "" : undefined));

  const handleChangeMethod = () => {
    deleteDeviceAction();
    setMethod(undefined);
    setPasscodeReady(false);
    setError(false);
    setValue(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleChangeContact = () => {
    deleteDeviceAction();
    setPasscodeReady(false);
    setValue("");
    setError(false);
  };

  useEffect(() => {
    if (resentPasscode) {
      let timeout = setTimeout(() => {
        setResentPasscode(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [resentPasscode]);

  return (
    <div className="mfa-edit-form">
      <div className="mfa-header">
        <img src={PING} alt="" className="mfa-logo" />
        <h3>Multi-factor authentication</h3>
      </div>
      <p className="mfa-subheader">
        You are adding a new method, follow the prompts by entering the details of the method, the
        security code, and click verify to add this new method.
      </p>

      {!method && (
        <>
          <div className="device-box-container">
            {DEVICE_TYPES.map((type) => (
              <MFAButton key={type} type={type} onClick={() => setMethod(type)} />
            ))}
          </div>
          <button className="btn-nest secondary" onClick={() => setView("DEFAULT")}>
            Cancel
          </button>
        </>
      )}

      {method === "SMS" && (
        <>
          <h2 className="method-header">
            <SvgMessage /> Text Message
          </h2>
          {!passcodeReady ? (
            <MFAPEnterPhoneForm
              handleNext={handleNext}
              handleCancel={handleChangeMethod}
              setValue={setValue}
              value={value}
              error={error}
              errorMsg={errorMsg}
              onRedirect={onRedirect}
            />
          ) : (
            <MFAPasscodeSMSForm
              setCode={setPasscode}
              code={passcode}
              defaultCode={defaultCode}
              passCodeError={passcodeError}
              phone={value!}
              handleResend={handleResendPasscode}
              resentPasscode={resentPasscode}
              handleChangeMethod={handleChangeMethod}
              handleChangeNumber={handleChangeContact}
              onFinish={handleFinish}
              onRedirect={onRedirect}
              mfaHistory="NEW"
            />
          )}
        </>
      )}
      {method === "VOICE" && (
        <>
          <h2 className="method-header">
            <SvgPhone /> Voice
          </h2>
          {!passcodeReady ? (
            <MFAPEnterPhoneForm
              handleNext={handleNext}
              handleCancel={handleChangeMethod}
              setValue={setValue}
              value={value}
              error={error}
              errorMsg={errorMsg}
              onRedirect={onRedirect}
            />
          ) : (
            <MFAPasscodeVoiceForm
              setCode={setPasscode}
              code={passcode}
              defaultCode={defaultCode}
              passCodeError={passcodeError}
              phone={value!}
              handleResend={handleResendPasscode}
              resentPasscode={resentPasscode}
              handleChangeMethod={handleChangeMethod}
              handleChangeNumber={handleChangeContact}
              onFinish={handleFinish}
              onRedirect={onRedirect}
              mfaHistory="NEW"
            />
          )}
        </>
      )}
      {method === "EMAIL" && (
        <>
          <h2 className="method-header">
            <SvgEmail /> Email
          </h2>
          {!passcodeReady ? (
            <MFAEnterEmailForm
              handleNext={handleNext}
              handleCancel={handleChangeMethod}
              handleChange={handleEmailChange}
              value={value!}
              error={error}
              errorMsg={errorMsg}
              onRedirect={onRedirect}
            />
          ) : (
            <MFAPasscodeEmailForm
              setCode={setPasscode}
              code={passcode}
              defaultCode={defaultCode}
              handleResend={handleResendPasscode}
              handleChangeMethod={handleChangeMethod}
              handleChangeEmail={handleChangeContact}
              onFinish={handleFinish}
              passCodeError={passcodeError}
              resentPasscode={resentPasscode}
              email={value!}
              onRedirect={onRedirect}
              mfaHistory="NEW"
            />
          )}
        </>
      )}
      {method === "TOTP" && (
        <>
          <h2 className="method-header">
            <SvgApp /> Authenticator App
          </h2>
          <MFAPasscodeAppForm
            setCode={setPasscode}
            code={passcode}
            defaultCode={defaultCode}
            passCodeError={passcodeError}
            handleChangeMethod={handleChangeMethod}
            onRedirect={onRedirect}
            devicesForAuth={[]}
            onFinish={handleFinish}
          />
        </>
      )}
      <ConfirmModal
        isOpen={showExitEditingConfirmPopup}
        onClose={() => setShowExitEditingConfirmPopup(false)}
        onConfirm={onCancelEdit}
        content={exitEditingStateConfirm}
      />
    </div>
  );
}
