import React, { SetStateAction, useEffect, useRef, useState } from "react";

import SvgChat from "assets/icons/SvgChat";
import SvgCheck from "assets/icons/SvgCheck";
import SvgClose from "assets/icons/SvgClose";
import SvgEdit from "assets/icons/SvgEdit";
import SvgSuccess from "assets/icons/SvgSuccess";
import SvgWarning from "assets/icons/SvgWarning";

import CollapseBtn from "src/components/buttons/collapseBtn/CollapseBtn";
import NestInput from "src/components/inputs/nestInput/NestInput";
import NestSwitch from "src/components/inputs/nestSwitch/NestSwitch";
import Loader from "src/components/loaders/Loader";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { exitEditingStateConfirm } from "src/components/modals/confirmModal/modalContent";
import ErrorModal from "src/components/modals/errorModal/ErrorModal";

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
  const [errorType, setErrorType] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState("");
  const [showExitEditingConfirmPopup, setShowExitEditingConfirmPopup] = useState(false);
  const [errorObject, setErrorObject] = useState({
    email: "",
    code: "",
    nickname: "",
  });

  useEffect(() => {
    if (
      userPersonalInfo?.nickname !== "" &&
      userPersonalInfo?.nickname !== undefined &&
      userPersonalInfo?.nickname !== null
    ) {
      setTempName(userPersonalInfo?.nickname);
    } else {
      setTempName(userPersonalInfo?.name?.given!);
    }
    if (
      userPersonalInfo?.email &&
      userPersonalInfo?.emailVerified !== undefined &&
      userPersonalInfo?.emailVerified !== null
    ) {
      setTempEmail(userPersonalInfo?.email);
      setIsEmailVerified(userPersonalInfo.emailVerified);
    }
  }, [userPersonalInfo]);

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
    setLoadingStep(true);
    const responseBody = {
      email: tempEmail,
      notificationType: "admin",
    };
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      axios
        .post(`${api_endpoint}/users/${userPersonalInfo?.userId}/emailVerification`, responseBody, {
          headers: {
            "Content-Type": "application/vnd.pingidentity.user.emailVerification.send+json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setErrorObject((errorObject) => ({
              ...errorObject,
              code: "",
            }));
            setLoadingStep(false);
            setResentPasscode(true);
            setTimeout(() => setResentPasscode(false), 30000);
          } else {
            throw new Error("Failed to resend verification email");
          }
        })
        .catch((err) => {
          setLoadingStep(false);
          setShowErrorModal(true);
        });
    } else {
      setLoadingStep(false);
      setShowErrorModal(true);
    }
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
        var responseBody = {
          email: tempEmail.trim(),
          notificationType: "admin",
        };
        if (
          sessionStorage.getItem("accessToken") !== null &&
          sessionStorage.getItem("accessToken") !== undefined
        ) {
          axios
            .patch(`${api_endpoint}/users/${userPersonalInfo?.userId}`, responseBody, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              },
            })
            .then((res) => {
              setIsEmailVerified(res.data.emailVerified);
              handleVerifyEmail();
            })
            .catch((err) => {
              if (err?.response) {
                if (err?.response?.status === 400) {
                  setLoadingStep(false);
                  if (err?.response?.data.details[0]?.target === "email") {
                    if (err?.response?.data.details[0]?.code === "UNIQUENESS_VIOLATION") {
                      setErrorObject((errorObject) => ({
                        ...errorObject,
                        email:
                          "The email you have provided is already in use, please choose another one!",
                      }));
                    } else {
                      setErrorObject((errorObject) => ({
                        ...errorObject,
                        email:
                          err?.response?.data.details[0]?.target +
                          " " +
                          err?.response?.data.details[0]?.message,
                      }));
                    }
                  } else {
                    setErrorObject((errorObject) => ({
                      ...errorObject,
                      email:
                        err?.response?.data?.details[0]?.target +
                        " " +
                        err?.response?.data?.details[0]?.message,
                    }));
                  }
                } else if (
                  err?.response?.status === 404 &&
                  err?.response?.statusText === "Not Found"
                ) {
                  setLoadingStep(false);
                  setErrorType("seriousErrorStatus");
                  setShowErrorModal(true);
                  setError("404 NOT FOUND");
                } else {
                  setLoadingStep(false);
                  setErrorMsg("We were unable to store the updated email!");
                  setShowErrorModal(true);
                }
              } else {
                setLoadingStep(false);
                setErrorMsg("We were unable to store the updated email!");
                setShowErrorModal(true);
              }
            });
        }
      }
    }
  };

  const handleVerifyEmail = () => {
    var responseBody = {
      email: tempEmail.trim(),
      notificationType: "admin",
    };
    axios
      .post(`${api_endpoint}/users/${userPersonalInfo?.userId}/emailVerification`, responseBody, {
        headers: {
          "Content-Type": "application/vnd.pingidentity.user.emailVerification.send+json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setLoadingStep(false);
        setIsEmailSaved(true);
        setTempEmail(tempEmail);
        setEditEmail(false);
        setShowNestInput(true);
        setUserPersonalInfo({
          ...userPersonalInfo,
          email: tempEmail,
        });
      })
      .catch((err) => {
        setLoadingStep(false);
        setErrorMsg("We were unable to initiate the email verification step!");
        setShowErrorModal(true);
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
      var responseBody = {
        nickname: tempName.trim(),
      };
      if (
        sessionStorage.getItem("accessToken") !== null &&
        sessionStorage.getItem("accessToken") !== undefined
      ) {
        axios
          .patch(`${api_endpoint}/users/${userPersonalInfo?.userId}`, responseBody, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
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
            sessionStorage.setItem("nickName", tempName);
          })
          .catch((err) => {
            if (err?.response) {
              if (err?.response?.status === 400) {
                setLoadingStep(false);
                if (err?.response?.data) {
                  if (err?.response?.data.details[0]?.target === "nickname") {
                    setErrorObject((errorObject) => ({
                      ...errorObject,
                      nickname:
                        err?.response?.data?.details[0]?.target +
                        " " +
                        err?.response?.data?.details[0]?.message,
                    }));
                  } else {
                    setErrorObject((errorObject) => ({
                      ...errorObject,
                      nickname:
                        err?.response?.data?.details[0]?.target +
                        " " +
                        err?.response?.data?.details[0]?.message,
                    }));
                  }
                }
              } else if (
                err?.response?.status === 404 &&
                err?.response?.statusText === "Not Found"
              ) {
                setLoadingStep(false);
                setErrorType("seriousErrorStatus");
                setShowErrorModal(true);
                setError("404 NOT FOUND");
              } else {
                setLoadingStep(false);
                setErrorMsg("We were unable to update the preferred name!");
                setShowErrorModal(true);
              }
            } else {
              setLoadingStep(false);
              setErrorMsg("We were unable to update the preferred name!");
              setShowErrorModal(true);
            }
          });
      }
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMsg("");
    if (error === "404 NOT FOUND") {
      setErrorType("error");
      setError("");
      setErrorObject((errorObject) => ({
        ...errorObject,
        code: "",
      }));
    }
    setErrorType("");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    var responseBody = {
      verificationCode: code,
    };
    setLoadingStep(true);
    if (
      sessionStorage.getItem("accessToken") !== null &&
      sessionStorage.getItem("accessToken") !== undefined
    ) {
      axios
        .post(`${api_endpoint}/users/${userPersonalInfo?.userId}/emailVerification`, responseBody, {
          headers: {
            "Content-Type": "application/vnd.pingidentity.user.emailVerification.verify+json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          if (res.data.emailVerified) {
            setShowSuccessModal(true);
            setSuccessType("VERIFY_EMAIL");
            setIsEmailVerified(true);
            setShowNestInput(false);
            setIsEmailSaved(false);
            setCode("");
          }
          setLoadingStep(false);
        })
        .catch((err) => {
          if (err?.response) {
            if (err?.response?.status === 400) {
              if (
                err?.response?.data.details[0]?.code &&
                err?.response?.data?.details[0]?.target === "verificationCode"
              ) {
                setLoadingStep(false);
                if (err?.response?.data.details[0]?.code === "INVALID_VALUE") {
                  setErrorObject((errorObject) => ({
                    ...errorObject,
                    code: "Invalid verification code.",
                  }));
                } else {
                  setErrorObject((errorObject) => ({
                    ...errorObject,
                    code:
                      err?.response?.data.details[0]?.target +
                      " : " +
                      err?.response?.data.details[0]?.message,
                  }));
                }
              } else {
                setLoadingStep(false);
                setErrorMsg("We were unable to verify the code!");
                setShowErrorModal(true);
              }
            } else {
              setLoadingStep(false);
              setErrorMsg("We were unable to verify the code!");
              setShowErrorModal(true);
            }
          } else {
            setLoadingStep(false);
            setErrorMsg("We were unable to verify the code!");
            setShowErrorModal(true);
          }
        });
    }
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
                    <div className="resend-otp-action">
                      <SvgSuccess />
                      <p>Another code has been sent</p>
                    </div>
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
                <p className={isLoading ? "loader-block field-input" : "field-input"}>{tempName}</p>
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
