import React, { SetStateAction, useEffect } from "react";

import SvgClose from "src/assets/icons/SvgClose";
import SvgSuccess from "src/assets/icons/SvgSuccess";

type SuccessPopupProps = {
  showSuccessAddMFAPopup: boolean;
  setShowSuccessAddMFAPopup: React.Dispatch<SetStateAction<boolean>>;
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

const AddMFADeviceSuccessPopup = ({
  showSuccessAddMFAPopup,
  setShowSuccessAddMFAPopup,
  setSuccessType,
}: SuccessPopupProps) => {
  const handleCloseSuccessPopup = () => {
    setSuccessType("");
    setShowSuccessAddMFAPopup(false);
  };

  useEffect(() => {
    if (showSuccessAddMFAPopup) {
      const timeoutId = setTimeout(() => {
        handleCloseSuccessPopup();
      }, 30000);
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessAddMFAPopup]);

  return (
    <div>
      {showSuccessAddMFAPopup && (
        <div className="mainmodalpasswordchangesuccess" id="sticky-modal">
          <div className="password-change-success-content">
            <div className="svg-success-icon-password-change">
              <SvgSuccess fill={"#8DC14E"} />
            </div>
            <div className="password-change-success-text">New MFA method added</div>
          </div>
          <button className="svg-close-icon-password-change" onClick={handleCloseSuccessPopup}>
            <SvgClose fill={"#565454"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMFADeviceSuccessPopup;
