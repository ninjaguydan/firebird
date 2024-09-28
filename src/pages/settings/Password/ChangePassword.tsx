import React, { SetStateAction, useEffect, useRef, useState } from "react";

import PING from "assets/images/image 1.png";

import PasswordRequirements from "src/components/common/passwordRequirements/PasswordRequirements";
import NestInput from "src/components/inputs/nestInput/NestInput";
import Loader from "src/components/loaders/generalLoader/Loader";
import ConfirmModal from "src/components/modals/confirmModal/ConfirmModal";
import { exitEditingStateConfirm } from "src/components/modals/confirmModal/modalContent";

import { SuccessType } from "../Settings";
import { LoginSecurityViews } from "../SettingsLoginSecurity";

type ChangePasswordProps = {
  setView: React.Dispatch<SetStateAction<LoginSecurityViews>>;
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorModal: React.Dispatch<SetStateAction<boolean>>;
  setErrorSubMsg: React.Dispatch<SetStateAction<string>>;
  loadingStep: boolean;
  setLoadingStep: React.Dispatch<SetStateAction<boolean>>;
  setSuccessType: React.Dispatch<SetStateAction<SuccessType>>;
};

const ChangePassword = ({
  setView,
  setShowSuccessModal,
  setShowErrorModal,
  setErrorSubMsg,
  loadingStep,
  setLoadingStep,
  setSuccessType,
}: ChangePasswordProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showExitEditingConfirmPopup, setShowExitEditingConfirmPopup] = useState(false);

  const passwordFormatMessageArray = [
    "Between 8 and 255 characters (no spaces)",
    "Contain at least one number (0-9)",
    "Contain at least one uppercase letter (A-Z)",
    "Contain at least one lowercase letter (a-z)",
    "Contain at least one special character",
  ];

  const [editedData, setEditedData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [validationMessages, setValidationMessages] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    newPasswordValidations: [...passwordFormatMessageArray],
  });

  const checkEditedState = () => {
    setShowExitEditingConfirmPopup(true);
  };

  const handleInputChange = (
    field: "oldPassword" | "newPassword" | "confirmNewPassword",
    value: string,
  ) => {
    setValidationMessages((prevMessages) => ({ ...prevMessages, [field]: "" }));

    if (value.trim() === "") {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        ["newPasswordValidations"]: [...passwordFormatMessageArray],
        [field]: `${field === "confirmNewPassword" ? "Confirm password" : field === "newPassword" ? "New password" : "Old password"} can't be empty.`,
      }));
    } else {
      if (field === "newPassword") {
        let errorMessagesArray = [...passwordFormatMessageArray];
        const isBetween8And255 = value.length >= 8 && value.length <= 255;
        const hasSpecialCharacter = /[~!@#$%^&*()_=\[\]{}|;:,.<>/?]+/.test(value);
        const hasNumber = /\d+/.test(value);
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNoSpaces = !/\s/.test(value);

        if (isBetween8And255 && hasNoSpaces) {
          var index = errorMessagesArray.indexOf("Between 8 and 255 characters (no spaces)");
          errorMessagesArray.splice(index, 1);
        }

        if (hasSpecialCharacter) {
          var index = errorMessagesArray.indexOf("Contain at least one special character");
          errorMessagesArray.splice(index, 1);
        }

        if (hasNumber) {
          var index = errorMessagesArray.indexOf("Contain at least one number (0-9)");
          errorMessagesArray.splice(index, 1);
        }

        if (hasUpperCase) {
          var index = errorMessagesArray.indexOf("Contain at least one uppercase letter (A-Z)");
          errorMessagesArray.splice(index, 1);
        }

        if (hasLowerCase) {
          var index = errorMessagesArray.indexOf("Contain at least one lowercase letter (a-z)");
          errorMessagesArray.splice(index, 1);
        }

        if (value !== editedData.confirmNewPassword && editedData.confirmNewPassword.length > 0) {
          setValidationMessages((prevMessages) => ({
            ...prevMessages,
            ["confirmNewPassword"]: "Passwords do not match.",
          }));
        }
        if (value === editedData.confirmNewPassword && editedData.confirmNewPassword.length > 0) {
          setValidationMessages((prevMessages) => ({
            ...prevMessages,
            ["confirmNewPassword"]: "",
          }));
        }
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          ["newPasswordValidations"]: [...errorMessagesArray],
        }));
      } else if (field === "confirmNewPassword" && value !== editedData.newPassword) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [field]: "Passwords do not match.",
        }));
      }
    }
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    return;
  };

  const onCancelEdit = () => {
    setView("DEFAULT");
    handleResetFields();
  };

  const handleResetFields = () => {
    setValidationMessages({
      oldPassword: "",
      confirmNewPassword: "",
      newPassword: "",
      newPasswordValidations: [...passwordFormatMessageArray],
    });
    setEditedData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSaveChanges = () => {
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      handleSendChangePasswordNotification();
    }, 1000);
  };

  const handleSendChangePasswordNotification = () => {
    setSuccessType("PASSWORD_CHANGE");
    setShowSuccessModal(true);
    onCancelEdit();
  };

  useEffect(() => {
    if (
      validationMessages.confirmNewPassword === "" &&
      validationMessages.newPassword === "" &&
      validationMessages.oldPassword === "" &&
      editedData.oldPassword !== "" &&
      editedData.newPassword !== "" &&
      editedData.confirmNewPassword !== ""
    ) {
      buttonRef?.current?.focus();
    }
  }, [validationMessages, editedData]);

  return (
    <>
      {loadingStep && <Loader />}

      <div className="mfa-header vertical">
        <img src={PING} alt="" className="mfa-logo" />
        <h3>Password Change</h3>
      </div>

      <div className="password-change-inputs">
        <NestInput
          onChange={(e) => handleInputChange("oldPassword", e.target.value)}
          value={editedData?.oldPassword}
          id={"oldPasswordInput"}
          type="password"
          label="Old Password"
          error={validationMessages?.oldPassword}
        />
        <NestInput
          onChange={(e) => handleInputChange("newPassword", e.target.value)}
          value={editedData.newPassword}
          id={"newPasswordInput"}
          type="password"
          label="New Password"
          error={validationMessages?.newPassword}
          maxLength={255}
        />
        <PasswordRequirements value={editedData.newPassword} />
        <NestInput
          onChange={(e) => handleInputChange("confirmNewPassword", e.target.value)}
          value={editedData.confirmNewPassword}
          id={"confirmNewPasswordInput"}
          type="password"
          label="Confirm New Password"
          error={validationMessages?.confirmNewPassword}
          maxLength={255}
        />
        <div className="btn-group">
          <button className="btn-nest secondary" onClick={checkEditedState}>
            Cancel
          </button>
          <button
            ref={buttonRef}
            className="btn-nest primary"
            disabled={
              validationMessages.confirmNewPassword !== "" ||
              validationMessages.newPassword !== "" ||
              validationMessages.newPasswordValidations.length > 0 ||
              validationMessages.confirmNewPassword !== "" ||
              validationMessages.oldPassword !== "" ||
              editedData.oldPassword === "" ||
              editedData.newPassword === "" ||
              editedData.confirmNewPassword === ""
                ? true
                : false
            }
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={showExitEditingConfirmPopup}
        onClose={() => setShowExitEditingConfirmPopup(false)}
        onConfirm={onCancelEdit}
        content={exitEditingStateConfirm}
      />
    </>
  );
};

export default ChangePassword;
