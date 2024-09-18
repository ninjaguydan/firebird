import React, { useContext, useEffect, useState } from "react";

import SvgMessage from "assets/icons/SvgMessage";

import MFAPEnterPhoneForm from "src/components/forms/MFAEnterPhoneForm";
import MFAPasscodeSMSForm from "src/components/forms/MFAPasscodeSMSForm";
import Loader from "src/components/loaders/Loader";

import { StepContext } from "src/pages/registration/Registration";

import { ContactInfo } from "src/utils/interfaces/registration/IContactInfo";
import { COMPLETE } from "src/utils/interfaces/registration/IRegistrationSteps";

import { CancelContext } from "../MFASetup";

type MFASmsProps = {
  contact: ContactInfo;
  onRedirect: () => void;
};

export default function MFASMS({ contact, onRedirect }: MFASmsProps) {
  const [passcode, setPasscode] = useState<string | null>(null);
  const [defaultCode, setDefaultCode] = useState<string | undefined>(undefined);
  const [passcodeReady, setPasscodeReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(false);
  const [resendOtpAction, setResendOtpAction] = useState(false);

  const [phone, setPhone] = useState("");
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
        <SvgMessage />
        <h2>Text Message</h2>
      </header>
      {!passcodeReady ? (
        <MFAPEnterPhoneForm
          handleNext={handleNext}
          handleCancel={onCancel}
          setValue={setNumber}
          value={number}
          defaultNum={contact.phone}
          onRedirect={onRedirect}
        />
      ) : (
        <MFAPasscodeSMSForm
          setCode={setPasscode}
          code={passcode}
          loginMfaStatus={"EXISTING"}
          defaultCode={defaultCode}
          phone={phone}
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
