import React, { SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Loader from "src/components/loaders/Loader";

import { ContactContext } from "src/pages/registration/Registration";

import { AUTH_APP, EMAIL, IMfaMethods, TEXT_MESSAGE, VOICE } from "src/utils/interfaces/auth/IMFA";

import MFAList from "../MFAList";
import MFAApp from "./MFAApp";
import MFAEmail from "./MFAEmail";
import MFASMS from "./MFASMS";
import MFAVoice from "./MFAVoice";

export const CancelContext = createContext(() => {});

type MFASetupProps = {
  onRedirect: () => void;
};

export default function MFASetup({ onRedirect }: MFASetupProps) {
  const navigate = useNavigate();
  const [method, setMethod] = useState<keyof IMfaMethods | "">("");
  const [loadingStep, setLoadingStep] = useState(false);
  const contact = useContext(ContactContext);

  const handleCancel = () => setMethod("");

  return (
    <section className="mfa-setup">
      {loadingStep && <Loader />}
      <p>
        To enhance the security of your account, you will need to enroll in multi-factor
        authentication (MFA).
      </p>

      <CancelContext.Provider value={handleCancel}>
        {method === "" && <MFAList selectMethod={setMethod} deviceList={[]} />}
        {method === TEXT_MESSAGE && <MFASMS contact={contact} onRedirect={onRedirect} />}
        {method === VOICE && <MFAVoice contact={contact} onRedirect={onRedirect} />}
        {method === EMAIL && <MFAEmail contact={contact} onRedirect={onRedirect} />}
        {method === AUTH_APP && <MFAApp contact={contact} onRedirect={onRedirect} />}
      </CancelContext.Provider>
    </section>
  );
}
