import React, { SetStateAction, useEffect } from "react";

import SvgClose from "assets/icons/SvgClose";
import SvgSuccess from "assets/icons/SvgSuccess";

type SuccessPopupProps = {
  showSuccessUpdateMFAPopup: boolean;
  setShowSuccessUpdateMFAPopup: React.Dispatch<SetStateAction<boolean>>;
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

const UpdateMFADeviceSuccessPopup = ({
  showSuccessUpdateMFAPopup,
  setShowSuccessUpdateMFAPopup,
  setSuccessType,
}: SuccessPopupProps) => {
  const handleCloseSuccessPopup = () => {
    setSuccessType("");
    setShowSuccessUpdateMFAPopup(false);
  };

  useEffect(() => {
    if (showSuccessUpdateMFAPopup) {
      const timeoutId = setTimeout(() => {
        setSuccessType("");
        handleCloseSuccessPopup();
      }, 30000);
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessUpdateMFAPopup]);

  return (
    <div>
      {showSuccessUpdateMFAPopup && (
        <div className="mainmodalpasswordchangesuccess" id="sticky-modal">
          <div className="password-change-success-content">
            <div className="svg-success-icon-password-change">
              <SvgSuccess fill={"#8DC14E"} />
            </div>
            <div className="password-change-success-text">MFA method changed</div>
          </div>
          <button className="svg-close-icon-password-change" onClick={handleCloseSuccessPopup}>
            <SvgClose fill={"#565454"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateMFADeviceSuccessPopup;
