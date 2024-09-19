import React, { SetStateAction, useContext, useEffect, useState } from "react";

import SvgApp from "assets/icons/SvgApp";

import MFAPasscodeAppForm from "src/components/forms/MFAPasscodeAppForm";
import Loader from "src/components/loaders/Loader";

import { StepContext } from "src/pages/registration/Registration";

import { ContactInfo } from "src/utils/interfaces/registration/IContactInfo";
import { COMPLETE } from "src/utils/interfaces/registration/IRegistrationSteps";

import { CancelContext } from "./MFASetup";

type MFAAppProps = {
  contact: ContactInfo;
  onRedirect: () => void;
};

export default function MFAApp({ onRedirect }: MFAAppProps) {
  const [code, setCode] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(false);
  const [defaultCode, setDefaultCode] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");

  const setCurrentStep = useContext(StepContext)!;
  const handleChangeMethod = async () => useContext(CancelContext);

  const handleFinish = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setCurrentStep(COMPLETE);
    }, 3000);
  };

  return (
    <>
      {loadingStep && <Loader />}

      <header className="method-header">
        <SvgApp />
        <h2>Authenticator App</h2>
      </header>

      <MFAPasscodeAppForm
        setCode={setCode}
        code={code}
        defaultCode={defaultCode}
        passCodeError={error}
        handleChangeMethod={handleChangeMethod}
        onFinish={handleFinish}
        onRedirect={onRedirect}
        devicesForAuth={[]}
      />
    </>
  );
}
