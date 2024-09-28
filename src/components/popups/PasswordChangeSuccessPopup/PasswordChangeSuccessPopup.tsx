import React, { SetStateAction, useEffect, useRef } from "react";

import SvgClose from "src/assets/icons/SvgClose";
import SvgSuccess from "src/assets/icons/SvgSuccess";

import "./password-change-success.css";

type SuccessPopupProps = {
  showSuccessPasswordPopup: boolean;
  setShowSuccessPasswordPopup: React.Dispatch<SetStateAction<boolean>>;
  setSuccessType: React.Dispatch<
    SetStateAction<
      | ""
      | "EDIT_MFA_DEVICE"
      | "ADD_MFA_DEVICE"
      | "DELETE_MFA_DEVICE"
      | "PASSWORD_CHANGE"
      | "VERIFY_EMAIL"
      | "EDIT_NICKNAME"
    >
  >;
};

const PasswordChangeSuccessPopup = ({
  showSuccessPasswordPopup,
  setShowSuccessPasswordPopup,
  setSuccessType,
}: SuccessPopupProps) => {
  const handleCloseSuccessPopup = () => {
    setSuccessType("");
    setShowSuccessPasswordPopup(false);
  };

  useEffect(() => {
    if (showSuccessPasswordPopup) {
      const timeoutId = setTimeout(() => {
        setSuccessType("");
        handleCloseSuccessPopup();
      }, 30000);
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessPasswordPopup]);

  return (
    <div>
      {showSuccessPasswordPopup && (
        <div className="mainmodalpasswordchangesuccess" id="sticky-modal">
          <div className="password-change-success-content">
            <div className="svg-success-icon-password-change">
              <SvgSuccess fill={"#8DC14E"} />
            </div>
            <div className="password-change-success-text">Password successfully changed</div>
          </div>
          <button className="svg-close-icon-password-change" onClick={handleCloseSuccessPopup}>
            <SvgClose fill={"#565454"} />
          </button>
        </div>
      )}
    </div>
  );
};
export default PasswordChangeSuccessPopup;
