import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import SvgApp from "assets/icons/SvgApp";
import SvgEmail from "assets/icons/SvgEmail";
import SvgMessage from "assets/icons/SvgMessage";
import SvgPhone from "assets/icons/SvgPhone";

import MFAPasscodeAppForm from "src/components/forms/MFAPasscodeAppForm";
import MFAPasscodeEmailForm from "src/components/forms/MFAPasscodeEmailForm";
import MFAPasscodeSMSForm from "src/components/forms/MFAPasscodeSMSForm";
import MFAPasscodeVoiceForm from "src/components/forms/MFAPasscodeVoiceForm";
import Loader from "src/components/loaders/generalLoader/Loader";

import { IDevice, IMfaMethods } from "src/utils/interfaces/auth/IMFA";

type TypeContact = {
  phone?: string;
  email?: string;
  userId?: string;
};

type ExistingfMFAProps = {
  method: keyof IMfaMethods | null | undefined;
  selectMethod: (
    e: any,
    method: keyof IMfaMethods,
    status: "NEW" | "EXISTING",
    action?: "send" | "resend",
  ) => void;
  resendOtpAction: boolean;
  devicesForAuth: IDevice[];
  setResendOtpAction: React.Dispatch<SetStateAction<boolean>>;
  handleChangeMethod: (status: "NEW" | "EXISTING") => void;
  deviceSelectedForAuthentication: IDevice;
  logIn: () => void;
};

export default function LoginMFA({
  method,
  resendOtpAction,
  setResendOtpAction,
  devicesForAuth,
  handleChangeMethod,
  deviceSelectedForAuthentication,
  logIn,
}: ExistingfMFAProps) {
  const [passcode, setPasscode] = useState<string | null>(null);
  const [defaultCode, setDefaultCode] = useState<string | undefined>(undefined);

  const [error, setError] = useState("");
  const [contact, setContact] = useState<TypeContact>({});

  const [loadingStep, setLoadingStep] = useState(false);
  const navigate = useNavigate();

  const handleResendPasscode = (e: any) => {
    setDefaultCode((prev) => (prev === undefined ? "" : undefined));
    setPasscode(null);
    setResendOtpAction(true);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStep(true);

    setTimeout(() => {
      setLoadingStep(false);
      logIn();
    }, 1000);
  };

  const onRedirect = () => navigate("/login");

  useEffect(() => {
    if (!passcode) {
      setError("");
    }
  }, [passcode]);

  useEffect(() => {
    if (resendOtpAction) {
      let timeout = setTimeout(() => {
        setResendOtpAction(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [resendOtpAction]);

  useEffect(() => {
    if (deviceSelectedForAuthentication) {
      setContact({
        phone: deviceSelectedForAuthentication?.phone,
        email: deviceSelectedForAuthentication?.email,
      });
    }
  }, [deviceSelectedForAuthentication]);

  return (
    <>
      {loadingStep && <Loader />}

      {method === "SMS" && (
        <>
          <h2 className="method-header">
            <SvgMessage /> Text Message
          </h2>
          <MFAPasscodeSMSForm
            setCode={setPasscode}
            code={passcode}
            loginMfaStatus={"EXISTING"}
            defaultCode={defaultCode}
            passCodeError={error}
            phone={contact.phone!}
            devicesForAuth={devicesForAuth}
            handleResend={handleResendPasscode}
            resentPasscode={resendOtpAction}
            handleChangeMethod={() => handleChangeMethod("EXISTING")}
            onFinish={handleFinish}
            onRedirect={onRedirect}
          />
        </>
      )}
      {method === "VOICE" && (
        <>
          <h2 className="method-header">
            <SvgPhone /> Voice
          </h2>
          <MFAPasscodeVoiceForm
            setCode={setPasscode}
            code={passcode}
            loginMfaStatus={"EXISTING"}
            defaultCode={defaultCode}
            passCodeError={error}
            phone={contact.phone}
            devicesForAuth={devicesForAuth}
            handleResend={handleResendPasscode}
            resentPasscode={resendOtpAction}
            handleChangeMethod={() => handleChangeMethod("EXISTING")}
            onFinish={handleFinish}
            onRedirect={onRedirect}
          />
        </>
      )}
      {method === "EMAIL" && (
        <>
          <h2 className="method-header">
            <SvgEmail /> Email
          </h2>
          <MFAPasscodeEmailForm
            setCode={setPasscode}
            code={passcode}
            loginMfaStatus={"EXISTING"}
            defaultCode={defaultCode}
            passCodeError={error}
            email={contact.email}
            devicesForAuth={devicesForAuth}
            handleResend={handleResendPasscode}
            resentPasscode={resendOtpAction}
            handleChangeMethod={() => handleChangeMethod("EXISTING")}
            onFinish={handleFinish}
            onRedirect={onRedirect}
          />
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
            devicesForAuth={devicesForAuth}
            passCodeError={error}
            handleChangeMethod={() => handleChangeMethod("EXISTING")}
            onFinish={handleFinish}
            onRedirect={onRedirect}
          />
        </>
      )}
    </>
  );
}
