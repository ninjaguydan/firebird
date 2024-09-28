import React, { FormEvent, SetStateAction, useEffect, useState } from "react";

import SvgApp from "assets/icons/SvgApp";
import SvgEmail from "assets/icons/SvgEmail";
import SvgMessage from "assets/icons/SvgMessage";
import SvgPhone from "assets/icons/SvgPhone";
import PING from "assets/images/image 1.png";

import MFAEnterEmailForm from "src/components/forms/MFAEnterEmailForm";
import MFAPEnterPhoneForm from "src/components/forms/MFAEnterPhoneForm";
import MFAPasscodeAppForm from "src/components/forms/MFAPasscodeAppForm";
import MFAPasscodeEmailForm from "src/components/forms/MFAPasscodeEmailForm";
import MFAPasscodeSMSForm from "src/components/forms/MFAPasscodeSMSForm";
import MFAPasscodeVoiceForm from "src/components/forms/MFAPasscodeVoiceForm";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { exitEditingStateConfirm } from "src/components/modals/confirmModal/modalContent";

import { IDevice, IMfaMethods } from "src/utils/interfaces/auth/IMFA";
import { validateEmail } from "src/utils/validators/validators";

import { SuccessType } from "../Settings";
import { LoginSecurityViews } from "../SettingsLoginSecurity";

type MFAEditProps = {
  deviceToEdit: IDevice;
  deviceAuthenticationEndpoint: string;
  setDeviceAuthenticationEndpoint: React.Dispatch<SetStateAction<string>>;
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorSubMsg: React.Dispatch<SetStateAction<string>>;
  setLoadingStep: React.Dispatch<SetStateAction<boolean>>;
  setView: React.Dispatch<SetStateAction<LoginSecurityViews>>;
  setSuccessType: React.Dispatch<SetStateAction<SuccessType>>;
};

export default function SettingsMFAEdit({
  deviceToEdit,
  deviceAuthenticationEndpoint,
  setDeviceAuthenticationEndpoint,
  setShowSuccessModal,
  setShowErrorModal,
  setShowErrorSubMsg,
  setLoadingStep,
  setView,
  setSuccessType,
}: MFAEditProps) {
  const [value, setValue] = useState<string | null>(null);
  const [passcode, setPasscode] = useState<string | null>(null);
  const [passcodeReady, setPasscodeReady] = useState(false);
  const [resentPasscode, setResentPasscode] = useState(false);
  const [defaultCode, setDefaultCode] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [secretValues, setSecretValues] = useState({});
  const [showExitEditingConfirmPopup, setShowExitEditingConfirmPopup] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<{
    minutes: string | number;
    seconds: string | number;
  } | null>(null);
  const [targetTimestamp, setTargetTimestamp] = useState(0);

  useEffect(() => {
    if (!passcode || !value) {
      setError(false);
      setErrorMsg("");
      setPasscodeError("");
    }
  }, [passcode, value]);

  const onRedirect = () => {
    if (passcodeReady) {
      setShowExitEditingConfirmPopup(true);
    } else {
      onCancelEdit();
    }
  };

  const onCancelEdit = () => {
    handleDeleteDevice(deviceAuthenticationEndpoint);
    setView("DEFAULT");
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = sessionStorage.getItem("accessToken");
    const userData = JSON.parse(sessionStorage.getItem("userInfo")!);
    const userId = userData["p1.userId"];

    if (!accessToken || !userId || !value || !deviceToEdit.type) return;

    const isEmailMethod = deviceToEdit.type === "EMAIL";
    const isSmsOrVoiceMethod = deviceToEdit.type === "SMS" || deviceToEdit.type === "VOICE";

    let err = "";

    if (isEmailMethod) {
      err = validateEmail(value);
      setErrorMsg(err);
      setError(true);
      if (err) return;
    }

    handleCreateDevice(
      accessToken,
      deviceToEdit.type,
      userId,
      isEmailMethod ? value : "",
      isSmsOrVoiceMethod ? value : "",
      "send",
    );
  };

  async function handleCreateDevice(
    accessToken: string,
    type: keyof IMfaMethods | undefined,
    userId: string,
    email: string,
    phoneNum: string,
    action: string,
  ) {
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setPasscodeReady(true);
      if (action === "resend") {
        setErrorMsg("");
        setResentPasscode(true);
      }
    }, 1000);
  }

  const handleDeleteDevice = (deviceActivationEndpoint: string) => {
    deleteDeviceAction();
  };

  const deleteDeviceAction = () => {
    setDeviceAuthenticationEndpoint("");
    setPasscodeReady(false);
    setResentPasscode(false);
  };

  const handleFinish = (e: FormEvent<Element>) => {
    e.preventDefault();
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      handleDelete();
    }, 1000);
  };

  const handleDelete = () => {
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setShowSuccessModal(true);
      setSuccessType("EDIT_MFA_DEVICE");
      setView("DEFAULT");
    }, 1000);
  };

  const handleResendPasscode = () => {
    setDefaultCode((prev) => (prev === undefined ? "" : undefined));
    setPasscode(null);
  };

  const handleChangeMethod = () => {
    handleDeleteDevice(deviceAuthenticationEndpoint);
    setValue("");
    setError(false);
    onRedirect();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleChangeContact = () => {
    handleDeleteDevice(deviceAuthenticationEndpoint);
    setError(false);
    setValue("");
    setPasscodeReady(false);
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
        You are changing an existing method, follow the prompts by entering the method&apos;s new
        details, the security code, and click verify to change this method.
      </p>

      {deviceToEdit.type === "SMS" && (
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
              mfaHistory="EDIT"
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
              mfaHistory="EDIT"
            />
          )}
        </>
      )}
      {deviceToEdit.type === "VOICE" && (
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
              mfaHistory="EDIT"
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
              mfaHistory="EDIT"
            />
          )}
        </>
      )}
      {deviceToEdit.type === "EMAIL" && (
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
              mfaHistory="EDIT"
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
              mfaHistory="EDIT"
            />
          )}
        </>
      )}
      {deviceToEdit.type === "TOTP" && (
        <>
          <h2 className="method-header">
            <SvgApp /> Authenticator App
          </h2>
          <MFAPasscodeAppForm
            setCode={setPasscode}
            code={passcode}
            defaultCode={defaultCode}
            passCodeError={passcodeError}
            devicesForAuth={[]}
            handleChangeMethod={handleChangeMethod}
            onFinish={handleFinish}
            onRedirect={onRedirect}
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
