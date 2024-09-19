import React, { useContext, useEffect, useState } from "react";

import SvgEmail from "src/assets/icons/SvgEmail";
import SvgPhone from "src/assets/icons/SvgPhone";

import MFAEnterEmailForm from "src/components/forms/MFAEnterEmailForm";
import MFAPasscodeEmailForm from "src/components/forms/MFAPasscodeEmailForm";
import MFAPasscodeVoiceForm from "src/components/forms/MFAPasscodeVoiceForm";
import Loader from "src/components/loaders/Loader";

import { StepContext } from "src/pages/registration/Registration";

import { ContactInfo } from "src/utils/interfaces/registration/IContactInfo";
import { COMPLETE } from "src/utils/interfaces/registration/IRegistrationSteps";

import { CancelContext } from "./MFASetup";

type MFAEmailProps = {
  contact: ContactInfo;
  onRedirect: () => void;
};

export default function MFAEmail({ contact, onRedirect }: MFAEmailProps) {
  const [passcode, setPasscode] = useState<string | null>(null);
  const [defaultCode, setDefaultCode] = useState<string | undefined>(undefined);
  const [passcodeReady, setPasscodeReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(false);
  const [resendOtpAction, setResendOtpAction] = useState(false);

  const [email, setEmail] = useState(contact.email);
  const [number, setNumber] = useState<string | null>(null);
  const [error, setError] = useState("");

  const setCurrentStep = useContext(StepContext)!;

  const onCancel = useContext(CancelContext);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setPasscodeReady(true);
    }, 3000);
  };

  const handleSendOtp = () => setResendOtpAction(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleFinish = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setCurrentStep(COMPLETE);
    }, 3000);
  };

  useEffect(() => {
    if (resendOtpAction) {
      const timeout = setTimeout(() => {
        setResendOtpAction(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [resendOtpAction]);

  return (
    <div className="method sms">
      {loadingStep && <Loader />}

      <header className="method-header">
        <SvgEmail />
        <h2>Email</h2>
      </header>
      {!passcodeReady ? (
        <MFAEnterEmailForm
          handleNext={handleNext}
          handleCancel={onCancel}
          value={email}
          handleChange={handleChange}
          onRedirect={onRedirect}
        />
      ) : (
        <MFAPasscodeEmailForm
          setCode={setPasscode}
          code={passcode}
          loginMfaStatus={"EXISTING"}
          defaultCode={defaultCode}
          email={email}
          handleResend={handleSendOtp}
          resentPasscode={resendOtpAction}
          devicesForAuth={[]}
          handleChangeMethod={() => onCancel()}
          onFinish={handleFinish}
          passCodeError={error}
          onRedirect={onRedirect}
        />
      )}
    </div>
  );
}
