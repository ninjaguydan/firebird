import React, { useEffect, useRef, useState } from "react";

import SvgSettings from "assets/icons/SvgSettings";
import SvgSignOut from "assets/icons/SvgSignOut";

import Loader from "src/components/loaders/generalLoader/Loader";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { signOutContent } from "src/components/modals/confirmModal/modalContent";
import ErrorModal from "src/components/modals/errorModal/ErrorModal";

import SuccessPopup from "src/layout/successPopup/SuccessPopup";

import { EMPTY_USER } from "src/utils/interfaces/registration/IUser";

import SettingsBillingForm from "./SettingsBillingForm";
import SettingCommunicationForm from "./SettingsCommunicationForm";
import SettingsLoginSecurity from "./SettingsLoginSecurity";
import SettingsPersonalInfo from "./SettingsPersonalInfo";
import "./settings.css";

export type SuccessType =
  | ""
  | "ADD_MFA_DEVICE"
  | "EDIT_MFA_DEVICE"
  | "DELETE_MFA_DEVICE"
  | "PASSWORD_CHANGE"
  | "VERIFY_EMAIL"
  | "EDIT_NICKNAME";

export type PersonalInfo = {
  userId?: String;
  name?: { given?: string; family?: string };
  email?: string;
  emailVerified?: boolean;
  streetArray?: string[];
  city?: string;
  state?: string;
  postalCode?: string;
  primaryPhone?: string;
  nickname?: string;
  preferredName?: string;
};
type SettingProps = {
  logOut: (action: string) => void;
};

const Settings = ({ logOut }: SettingProps) => {
  const [userPersonalInfo, setUserPersonalInfo] = useState<PersonalInfo>({
    userId: "bcmitm",
    name: { given: EMPTY_USER.fname, family: EMPTY_USER.lname },
    email: EMPTY_USER.email,
    emailVerified: true,
    preferredName: "Walt",
    primaryPhone: EMPTY_USER.phone,
  });
  const [fullAddressArray, setFullAddressArray] = useState<[] | RegExpMatchArray>([]);
  const [showShowErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorSubMsg, setErrorSubMsg] = useState("");
  const [successType, setSuccessType] = useState<SuccessType>("");
  const [loadingStep, setLoadingStep] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const handleShow = () => setConfirmModalOpen(true);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorSubMsg("");
  };

  return (
    <>
      {loadingStep && <Loader />}
      <h1 className="page-header">Settings</h1>
      <section className="settings nest-card">
        <div className="section-col">
          <SettingsPersonalInfo
            fullAddressArray={fullAddressArray}
            userPersonalInfo={userPersonalInfo}
            isLoading={Object.keys(userPersonalInfo).length < 1}
          />
        </div>
        <div className="section-col">
          <h2 className="card-header alt">
            <SvgSettings filled /> Account Settings
          </h2>
          <div className="nest-card alt account-settings">
            <SettingsLoginSecurity
              setShowSuccessModal={setShowSuccessModal}
              setShowErrorModal={setShowErrorModal}
              setErrorSubMsg={setErrorSubMsg}
              loadingStep={loadingStep}
              setLoadingStep={setLoadingStep}
              successType={successType}
              setSuccessType={setSuccessType}
            />
            <hr />
            <SettingsBillingForm
              userPersonalInfo={userPersonalInfo}
              setUserPersonalInfo={setUserPersonalInfo}
              isLoading={Object.keys(userPersonalInfo).length < 1}
            />
            <hr />
            <SettingCommunicationForm
              userPersonalInfo={userPersonalInfo}
              setUserPersonalInfo={setUserPersonalInfo}
              isLoading={Object.keys(userPersonalInfo).length < 1}
              setShowSuccessModal={setShowSuccessModal}
              setSuccessType={setSuccessType}
            />
          </div>
        </div>
        <button className="btn-nest primary sign-out" onClick={handleShow}>
          <SvgSignOut />
          Sign Out
        </button>
        <ConfirmModal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={() => logOut("signOut")}
          content={signOutContent}
        />
        <ErrorModal
          showModal={showShowErrorModal}
          closeModal={handleCloseErrorModal}
          errorMessage={showErrorSubMsg}
        />
        <SuccessPopup
          showSuccessPopup={showSuccessModal}
          closePopup={() => {
            setShowSuccessModal(false);
            setSuccessType("");
          }}
          successType={successType}
        />
      </section>
    </>
  );
};

export default Settings;
