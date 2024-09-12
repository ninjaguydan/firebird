import { SetStateAction, createContext, useState } from "react";
import { useNavigate } from "react-router";

import RegistrationCard from "./components/RegistrationCard";
import RegistrationHeader from "./components/RegistrationHeader";
import RegistrationPWSetup from "./components/RegistrationPWSetup";
import RegistrationEmailVerfy from "./components/RegistrationVerify";
import ProgressBar from "src/components/common/progressBar/ProgressBar";
import Loader from "src/components/loaders/Loader";
import ErrorModal from "src/components/modals/errorModal/ErrorModal";
import GeneralModal, { GeneralModalContent } from "src/components/modals/generalModal/GeneralModal";

import Hero from "src/layout/hero/Hero";

import "src/pages/registration/registration.css";

import useScrollToTop from "src/utils/hooks/general/useScrollToTop";
import { EMPTY_CONTACT } from "src/utils/interfaces/registration/IContactInfo";
import {
  COMPLETE,
  IRegistrationSteps,
  MFA,
  PASSWORD_SETUP,
  PERSONAL_INFO,
  STEPS,
  VERIFICATION,
} from "src/utils/interfaces/registration/IRegistrationSteps";

export const ContactContext = createContext(EMPTY_CONTACT);
export const StepContext = createContext<React.Dispatch<
  SetStateAction<keyof IRegistrationSteps>
> | null>(null);

export default function Registration({}) {
  const navigate = useNavigate();

  const [loadingStep, setLoadingStep] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const [currentStep, setCurrentStep] = useState<keyof IRegistrationSteps>(PERSONAL_INFO);
  const [errorMessage, setErrorMessage] = useState("");
  const [contact, setContact] = useState(EMPTY_CONTACT);

  const USER_VERIFY = currentStep === VERIFICATION;
  const ACCOUNT_CREATION = currentStep === PASSWORD_SETUP;
  const CLEAN_EXIT = currentStep === PERSONAL_INFO || currentStep === COMPLETE;

  useScrollToTop(currentStep);

  const modalContent: GeneralModalContent = {
    header: "Are you sure?",
    message:
      USER_VERIFY || ACCOUNT_CREATION
        ? "Exiting now will cause you to lose all progress up to this point. To create a new account, you will have to start over from the beginning."
        : "If you exit now, you will be prompted to setup multi-factor authentication when trying to log in.",
    btnLabel: "Continue Editing",
    actionBtn: {
      label: ACCOUNT_CREATION
        ? "Exit without saving"
        : USER_VERIFY
          ? "Exit without verifying"
          : "Exit MFA Setup",
      action: () => navigate("/login"),
    },
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const onRedirect = () => (CLEAN_EXIT ? navigate("/login") : setShowWarningModal(true));

  return (
    <div className="registration-page">
      {loadingStep && <Loader />}
      <ErrorModal
        showModal={showErrorModal}
        closeModal={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
      <GeneralModal
        modalContent={modalContent}
        closeModal={() => setShowWarningModal(false)}
        showModal={showWarningModal}
      />
      <Hero subheader="New Account Sign Up" />
      <ProgressBar steps={STEPS} currentStep={currentStep} />
      <RegistrationHeader currentStep={currentStep} onRedirect={onRedirect} />

      <StepContext.Provider value={setCurrentStep}>
        {currentStep === PERSONAL_INFO && (
          <RegistrationCard contact={contact} setContact={setContact} onRedirect={onRedirect} />
        )}
        <ContactContext.Provider value={contact}>
          {currentStep === VERIFICATION && (
            <RegistrationEmailVerfy
              onRedirect={onRedirect}
              contact={contact}
              setContact={setContact}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === PASSWORD_SETUP && (
            <RegistrationPWSetup
              contact={contact}
              setContact={setContact}
              onRedirect={onRedirect}
            />
          )}

          {currentStep === MFA && (
            <MFASetup
              isMethodFound={isMethodFound}
              setIsMethodFound={setIsMethodFound}
              onRedirect={onRedirect}
              setShowMFAAppList={setShowMFAAppList}
            />
          )}
        </ContactContext.Provider>

        {currentStep === COMPLETE && <MFAComplete setCurrentStep={setCurrentStep} />}
      </StepContext.Provider>
    </div>
  );
}
