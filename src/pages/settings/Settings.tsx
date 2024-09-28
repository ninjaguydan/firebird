import React, { useEffect, useRef, useState } from "react";

import SvgSettings from "assets/icons/SvgSettings";
import SvgSignOut from "assets/icons/SvgSignOut";

import Loader from "src/components/loaders/Loader";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { signOutContent } from "src/components/modals/confirmModal/modalContent";
import ErrorModal from "src/components/modals/errorModal/ErrorModal";
import AddMFADeviceSuccessPopup from "src/components/popups/AddMFADeviceSuccessPopup/AddMFADeviceSuccessPopup";
import DeleteMFADeviceSuccessPopup from "src/components/popups/DeleteMFADeviceSuccessPopup/DeleteMFADeviceSuccessPopup";
import EmailVerificationSuccessPopup from "src/components/popups/EmailVerificationSuccessPopup/EmailVerificationSuccessPopup";
import PasswordChangeSuccessPopup from "src/components/popups/PasswordChangeSuccessPopup/PasswordChangeSuccessPopup";
import UpdateMFADeviceSuccessPopup from "src/components/popups/UpdateMFADeviceSuccessPopup/UpdateMFADeviceSuccessPopup";
import UpdateNicknameSuccessPopup from "src/components/popups/UpdateNicknameSuccessPopup/UpdateNicknameSuccessPopup";

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
  const [userPersonalInfo, setUserPersonalInfo] = useState<PersonalInfo>({});
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
        {successType === "PASSWORD_CHANGE" && (
          <PasswordChangeSuccessPopup
            showSuccessPasswordPopup={showSuccessModal}
            setShowSuccessPasswordPopup={setShowSuccessModal}
            setSuccessType={setSuccessType}
          />
        )}
        {successType === "ADD_MFA_DEVICE" && (
          <AddMFADeviceSuccessPopup
            showSuccessAddMFAPopup={showSuccessModal}
            setShowSuccessAddMFAPopup={setShowSuccessModal}
            setSuccessType={setSuccessType}
          />
        )}
        {successType === "DELETE_MFA_DEVICE" && (
          <DeleteMFADeviceSuccessPopup
            showSuccessDeleteMFAPopup={showSuccessModal}
            setShowSuccessDeleteMFAPopup={setShowSuccessModal}
            setSuccessType={setSuccessType}
          />
        )}
        {successType === "EDIT_MFA_DEVICE" && (
          <UpdateMFADeviceSuccessPopup
            showSuccessUpdateMFAPopup={showSuccessModal}
            setShowSuccessUpdateMFAPopup={setShowSuccessModal}
            setSuccessType={setSuccessType}
          />
        )}
        {successType === "EDIT_NICKNAME" && (
          <UpdateNicknameSuccessPopup
            showSuccessNicknameUpdated={showSuccessModal}
            setShowSuccessNicknameUpdated={setShowSuccessModal}
            setSuccessType={setSuccessType}
          />
        )}
        {successType === "VERIFY_EMAIL" && (
          <EmailVerificationSuccessPopup
            showSuccessEmailVerified={showSuccessModal}
            setShowSuccessEmailVerified={setShowSuccessModal}
            setSuccessType={setSuccessType}
          />
        )}
      </section>
    </>
  );
};

export default Settings;
