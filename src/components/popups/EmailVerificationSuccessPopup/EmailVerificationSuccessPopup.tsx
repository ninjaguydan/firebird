import React, { SetStateAction, useEffect } from "react";

import SvgClose from "assets/icons/SvgClose";
import SvgSuccess from "assets/icons/SvgSuccess";

type SuccessPopupProps = {
  showSuccessEmailVerified: boolean;
  setShowSuccessEmailVerified: React.Dispatch<SetStateAction<boolean>>;
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

const EmailVerificationSuccessPopup = ({
  showSuccessEmailVerified,
  setShowSuccessEmailVerified,
  setSuccessType,
}: SuccessPopupProps) => {
  const handleCloseSuccessPopup = () => {
    setSuccessType("");
    setShowSuccessEmailVerified(false);
  };

  useEffect(() => {
    if (showSuccessEmailVerified) {
      const timeoutId = setTimeout(() => {
        setSuccessType("");
        handleCloseSuccessPopup();
      }, 30000);
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessEmailVerified]);

  return (
    <div>
      {showSuccessEmailVerified && (
        <div className="mainmodalpasswordchangesuccess" id="sticky-modal">
          <div className="password-change-success-content">
            <div className="svg-success-icon-password-change">
              <SvgSuccess fill={"#8DC14E"} />
            </div>
            <div className="password-change-success-text">Email verified</div>
          </div>
          <button className="svg-close-icon-password-change" onClick={handleCloseSuccessPopup}>
            <SvgClose fill={"#565454"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationSuccessPopup;
