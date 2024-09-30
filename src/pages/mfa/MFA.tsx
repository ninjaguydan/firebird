import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import PING from "assets/images/image 1.png";

import Loader from "src/components/loaders/generalLoader/Loader";
import GeneralModal, { GeneralModalContent } from "src/components/modals/generalModal/GeneralModal";
import MFAList from "src/pages/mfa/components/MFAList";
import LoginMFA from "src/pages/mfa/components/auth/LoginMFA";

import Hero from "src/layout/hero/Hero";

import "src/pages/mfa/styles//mfa.css";
import "src/pages/mfa/styles/mfa-setup.css";

import { IDevice, IMfaMethods, demoDevices } from "src/utils/interfaces/auth/IMFA";

type MFAProps = {
  logIn: () => void;
};

export default function MFA({ logIn }: MFAProps) {
  const navigate = useNavigate();

  const [loadingStep, setLoadingStep] = useState(false);
  const [resendOtpAction, setResendOtpAction] = useState(false);

  const [method, setMethod] = useState<keyof IMfaMethods | null>(null);

  const [deviceList, setDeviceList] = useState<IDevice[]>(demoDevices);
  const [deviceSelectedForAuthentication, setDeviceSelectedForAuthentication] = useState<IDevice>();

  const [resentPasscode, setResentPasscode] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const modalContent: GeneralModalContent = {
    header: "Are you sure?",
    message:
      "This will redirect you to the Sign in page and you will have to go through the Sign in process again to access the application",
    btnLabel: "Continue Sign in",
    actionBtn: {
      label: "Exit Sign in",
      action: () => navigate("/login"),
    },
  };

  const selectMethod = (method: keyof IMfaMethods) => {
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setMethod(method);
    }, 1000);
  };

  const handleChangeMethod = () => setMethod(null);

  useEffect(() => {
    if (resentPasscode) {
      let timeout = setTimeout(() => {
        setResentPasscode(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [resentPasscode]);

  return (
    <div id="login-page">
      <Hero />
      <section className="login-actions">
        {loadingStep && <Loader />}

        <GeneralModal
          modalContent={modalContent}
          closeModal={() => setShowWarning(false)}
          showModal={showWarning}
        />
        <article className="login-card login-mfa">
          <h1 className="login-card-title">
            <img src={PING} alt="" className="mfa-logo" /> Multi-factor authentication
          </h1>
          {method === null && <MFAList deviceList={deviceList} selectMethod={selectMethod} />}
          <LoginMFA
            logIn={logIn}
            method={method}
            selectMethod={selectMethod}
            handleChangeMethod={handleChangeMethod}
            resendOtpAction={resendOtpAction}
            setResendOtpAction={setResendOtpAction}
            devicesForAuth={deviceList}
            deviceSelectedForAuthentication={deviceSelectedForAuthentication!}
          />
        </article>
      </section>
    </div>
  );
}
