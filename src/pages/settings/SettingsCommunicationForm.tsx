import React, { SetStateAction, useEffect, useRef, useState } from "react";

import SvgChat from "assets/icons/SvgChat";
import SvgCheck from "assets/icons/SvgCheck";
import SvgClose from "assets/icons/SvgClose";
import SvgEdit from "assets/icons/SvgEdit";
import SvgSuccess from "assets/icons/SvgSuccess";
import SvgWarning from "assets/icons/SvgWarning";

import CollapseBtn from "src/components/buttons/collapseBtn/CollapseBtn";
import ResentCode from "src/components/common/resentCode/ResentCode";
import NestInput from "src/components/inputs/nestInput/NestInput";
import NestSwitch from "src/components/inputs/nestSwitch/NestSwitch";
import Loader from "src/components/loaders/generalLoader/Loader";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { exitEditingStateConfirm } from "src/components/modals/confirmModal/modalContent";
import ErrorModal from "src/components/modals/errorModal/ErrorModal";

import { EMPTY_USER } from "src/utils/interfaces/registration/IUser";
import { validateEmail, validatePreferredName } from "src/utils/validators/validators";

import { PersonalInfo, SuccessType } from "./Settings";

type SettingCommunicationFormProps = {
  userPersonalInfo: PersonalInfo;
  setUserPersonalInfo: React.Dispatch<SetStateAction<PersonalInfo>>;
  isLoading: boolean;
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  setSuccessType: React.Dispatch<SetStateAction<SuccessType>>;
};

const SettingCommunicationForm = ({
  userPersonalInfo,
  setUserPersonalInfo,
  isLoading,
  setShowSuccessModal,
  setSuccessType,
}: SettingCommunicationFormProps) => {
  const [code, setCode] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingStep, setLoadingStep] = useState(false);

  const [phoneToggle, setPhoneToggle] = useState(false);

  const [editEmail, setEditEmail] = useState(false);
  const [editName, setEditName] = useState(false);

  const [tempEmail, setTempEmail] = useState("");
  const [tempName, setTempName] = useState("");

  const [isEmailSaved, setIsEmailSaved] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(Boolean);
  const [resentPasscode, setResentPasscode] = useState(false);

  const [showNestInput, setShowNestInput] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState("");
  const [showExitEditingConfirmPopup, setShowExitEditingConfirmPopup] = useState(false);
  const [errorObject, setErrorObject] = useState({
    email: "",
    code: "",
    nickname: "",
  });

  const toggleEditEmail = () => {
    setErrorObject((errorObject) => ({
      ...errorObject,
      email: validateEmail(tempEmail),
    }));
    setEditEmail((prev) => !prev);
  };

  const onCancel = () => {
    setShowExitEditingConfirmPopup(true);
  };

  const toggleEditName = () => {
    setErrorObject((errorObject) => ({
      ...errorObject,
      nickname: validatePreferredName(tempName),
    }));
    setEditName((prev) => !prev);
  };

  const handleResend = () => {
    setCode("");
    setResentPasscode(true);
    setTimeout(() => {
      setResentPasscode(false);
    }, 5000);
  };

  const onChangeEmail = () => {
    setEditEmail(true);
    setIsEmailSaved(false);
    setShowNestInput(false);
    setResentPasscode(false);
    setCode("");
    setErrorObject((errorObject) => ({
      ...errorObject,
      code: "",
      email: "",
    }));
  };

  const handleEmailEditClose = (action: "EXIT" | "SAVE") => {
    if (action === "EXIT") {
      if (
        userPersonalInfo?.email !== "" &&
        userPersonalInfo?.email !== undefined &&
        userPersonalInfo?.email !== null
      ) {
        setTempEmail(userPersonalInfo.email);
        setEditEmail((prev) => !prev);
        setErrorObject((errorObject) => ({
          ...errorObject,
          email: "",
        }));
      }
    }
    if (action === "SAVE") {
      setErrorObject((errorObject) => ({
        ...errorObject,
        email: validateEmail(tempEmail),
      }));
      if (errorObject.email === "" && validateEmail(tempEmail) === "") {
        setLoadingStep(true);
        setTimeout(() => {
          setIsEmailVerified(true);
          handleVerifyEmail();
        }, 1000);
      }
    }
  };

  const handleVerifyEmail = () => {
    setLoadingStep(false);
    setIsEmailSaved(true);
    setTempEmail(tempEmail);
    setEditEmail(false);
    setShowNestInput(true);
    setUserPersonalInfo({
      ...userPersonalInfo,
      email: tempEmail,
    });
  };

  const handleNameEditClose = (action: "EXIT" | "SAVE") => {
    if (action === "EXIT") {
      setErrorObject((errorObject) => ({
        ...errorObject,
        nickname: "",
      }));
      if (
        userPersonalInfo?.nickname !== "" &&
        userPersonalInfo?.nickname !== undefined &&
        userPersonalInfo?.nickname !== null
      ) {
        setTempName(userPersonalInfo?.nickname);
      } else {
        setTempName(userPersonalInfo?.preferredName!);
      }
      setEditName((prev) => !prev);
    }
    if (action === "SAVE") {
      setLoadingStep(true);
      setTimeout(() => {
        setLoadingStep(false);
        setTempName(tempName);
        setUserPersonalInfo({
          ...userPersonalInfo,
          nickname: tempName!,
        });
        setErrorObject((errorObject) => ({
          ...errorObject,
          nickname: "",
        }));
        setSuccessType("EDIT_NICKNAME");
        setShowSuccessModal(true);
        setEditName(false);
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMsg("");
    if (error === "404 NOT FOUND") {
      setError("");
      setErrorObject((errorObject) => ({
        ...errorObject,
        code: "",
      }));
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStep(true);
    setTimeout(() => {
      setShowSuccessModal(true);
      setSuccessType("VERIFY_EMAIL");
      setIsEmailVerified(true);
      setShowNestInput(false);
      setIsEmailSaved(false);
      setCode("");
    }, 1000);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorObject((errorObject) => ({
      ...errorObject,
      code: "",
    }));
    setCode(e.target.value);
  };

  const onCancelEdit = () => {
    setShowNestInput(false);
    setIsEmailSaved(false);
    setShowExitEditingConfirmPopup(false);
    setCode("");
  };

  return (
    <article className="communication-form">
      <ConfirmModal
        isOpen={showExitEditingConfirmPopup}
        onClose={() => setShowExitEditingConfirmPopup(false)}
        onConfirm={onCancelEdit}
        content={exitEditingStateConfirm}
      />
      {loadingStep && <Loader />}
      <ErrorModal
        showModal={showErrorModal}
        closeModal={handleCloseModal}
        errorMessage={errorMsg}
      />
      <h3 className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <SvgChat /> Communications
        <CollapseBtn isExpanded={isExpanded} setIsExpanded={setIsExpanded} withLabel={false} />
      </h3>
      {isExpanded && (
        <>
          {userPersonalInfo.primaryPhone &&
            userPersonalInfo.primaryPhone !== null &&
            userPersonalInfo.primaryPhone !== "" && (
              <>
                <h4>Notifications sent to:</h4>
                <div className="toggle-group">
                  <NestSwitch
                    onToggle={() => setPhoneToggle(!phoneToggle)}
                    ON={phoneToggle}
                    ariaLabel="Toggle Mobile"
                    disabled={isLoading}
                  />
                  <label className={isLoading ? "loader-block" : ""}>
                    {`SMS ${userPersonalInfo.primaryPhone || ""}`}
                  </label>
                </div>
              </>
            )}
          <form id="settings-edit" className="field-data edit" onSubmit={handleVerify}>
            {showNestInput && (
              <>
                <div className="form-header">
                  <p>Please check your email.</p>
                  <p className="subtext">
                    Look for the verification email that has been sent to{" "}
                    <span className="highlight">{` ${tempEmail || userPersonalInfo.email} `}</span>
                    and enter the code below.
                  </p>
                </div>
                <NestInput
                  label="Verification code"
                  value={code}
                  onChange={handleCodeChange}
                  type="password"
                  id="verify"
                  className="verify-code-field"
                  error={errorObject?.code}
                  disabled={editEmail}
                />
              </>
            )}
            {isEmailSaved ? (
              <>
                <div className="contact-group">
                  <p>Email sent to:</p>
                  <p className="user-contact">{tempEmail || userPersonalInfo.email}</p>
                </div>
                <div className="link-text-group">
                  <button className="btn-nest ghost" type="button" onClick={onChangeEmail}>
                    Change email
                  </button>
                  <div className="vr"></div>
                  {resentPasscode ? (
                    <ResentCode />
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="btn-nest ghost"
                      disabled={editEmail}
                    >
                      Resend code
                    </button>
                  )}
                </div>
                <button
                  id="settings-verify-button"
                  className="btn-nest primary"
                  type="submit"
                  disabled={
                    code === "" || editEmail || errorObject.code !== "" || errorObject.email !== ""
                  }
                >
                  Verify Email
                </button>
                <button
                  id="settings-verify-button"
                  type="button"
                  onClick={onCancel}
                  className={"btn-nest ghost"}
                >
                  Cancel
                </button>
              </>
            ) : !editEmail ? (
              <>
                <div className="field-data edit">
                  <div>
                    <h4 className="field-label">Email Address</h4>
                    <p
                      className={
                        isLoading
                          ? "loader-block field-input"
                          : isEmailVerified
                            ? "field-input"
                            : "field-input warning"
                      }
                    >
                      {userPersonalInfo.email}
                    </p>
                  </div>
                  <button
                    title={isEmailVerified ? "Edit email address" : "Verify email address"}
                    className="btn-nest secondary"
                    type="button"
                    onClick={isEmailVerified ? toggleEditEmail : handleVerifyEmail}
                    disabled={isLoading}
                  >
                    {!isEmailVerified ? (
                      "Verify email"
                    ) : (
                      <>
                        <SvgEdit />
                        Edit email
                      </>
                    )}
                  </button>
                </div>
                {!isEmailVerified && (
                  <div className="email-verified-info-section">
                    <div className="row-1">
                      <SvgWarning />
                      <p className="email-warning-message">
                        UNVERIFIED EMAIL - Please verify your email address.
                      </p>
                    </div>
                    <div className="row-2">
                      <p className="email-warning-message">Need to replace this email?</p>
                      <button onClick={toggleEditEmail} type="button" className="replace-email-btn">
                        Edit email
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="email-input-group">
                <NestInput
                  label="Email Address"
                  onChange={(e) => {
                    setErrorObject((errorObject) => ({
                      ...errorObject,
                      email: validateEmail(tempEmail),
                    }));
                    setTempEmail(e.target.value);
                  }}
                  value={tempEmail}
                  minLength={7}
                  maxLength={64}
                  id={"email"}
                  type="email"
                  autoFocus={true}
                  className="inline"
                  error={errorObject.email}
                />
                <div className="edit-email-btn-group">
                  <button
                    onClick={() => handleEmailEditClose("EXIT")}
                    className="btn-nest ghost"
                    title="Exit without saving"
                    type="button"
                  >
                    <SvgClose /> Close
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEmailEditClose("SAVE")}
                    className="btn-nest ghost"
                    title="Save new email"
                    disabled={
                      tempEmail === userPersonalInfo?.email ||
                      tempEmail === "" ||
                      tempEmail === undefined ||
                      tempEmail === null ||
                      errorObject.email !== ""
                    }
                  >
                    <SvgCheck className="save-icon" /> Save
                  </button>
                </div>
              </div>
            )}
          </form>
          {!editName ? (
            <div className="field-data edit">
              <div>
                <h4 className="field-label">Preferred Name</h4>
                <p className={isLoading ? "loader-block field-input" : "field-input"}>
                  {userPersonalInfo.preferredName}
                </p>
              </div>
              <button className="btn-nest secondary" onClick={toggleEditName} disabled={isLoading}>
                <SvgEdit /> Edit Name
              </button>
            </div>
          ) : (
            <div className="email-input-group">
              <NestInput
                label="Preferred Name"
                onChange={(e) => {
                  setTempName(e.target.value);
                  setErrorObject((errorObject) => ({
                    ...errorObject,
                    nickname: validatePreferredName(e.target.value),
                  }));
                }}
                value={tempName}
                id={"name"}
                autoFocus={true}
                error={errorObject.nickname}
              />
              <div className="edit-email-btn-group">
                <button
                  onClick={() => handleNameEditClose("EXIT")}
                  className="btn-nest ghost"
                  title="Exit without saving"
                  type="button"
                >
                  <SvgClose /> Close
                </button>
                <button
                  onClick={() => handleNameEditClose("SAVE")}
                  className="btn-nest ghost"
                  title="Save new email"
                  disabled={
                    tempName === userPersonalInfo?.nickname ||
                    tempName === "" ||
                    tempName === undefined ||
                    tempName === null ||
                    errorObject.nickname !== ""
                      ? true
                      : false
                  }
                >
                  <SvgCheck className="save-icon" /> Save
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default SettingCommunicationForm;
