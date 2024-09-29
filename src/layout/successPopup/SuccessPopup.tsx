import React, { useEffect } from "react";

import SvgClose from "src/assets/icons/SvgClose";
import SvgSuccess from "src/assets/icons/SvgSuccess";

import { SuccessType } from "src/pages/settings/Settings";

import "./SuccessPopup.css";

type SuccessPopupProps = {
  showSuccessPopup: boolean;
  closePopup: () => void;
  successType: SuccessType;
};

export default function SuccessPopup({
  showSuccessPopup,
  closePopup,
  successType,
}: SuccessPopupProps) {
  useEffect(() => {
    if (showSuccessPopup) {
      const timeoutId = setTimeout(() => {
        closePopup();
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessPopup]);

  return (
    <>
      {showSuccessPopup && (
        <aside className="success-popup" id="sticky-modal">
          <SvgSuccess className="success-icon" />
          {successType === "DELETE_MFA_DEVICE" && <p>Device deleted successfully!</p>}
          {successType === "ADD_MFA_DEVICE" && <p>Device added successfully!</p>}
          {successType === "EDIT_MFA_DEVICE" && <p>Device updated successfully!</p>}
          {successType === "EDIT_NICKNAME" && <p>Nickname updated successfully!</p>}
          {successType === "PASSWORD_CHANGE" && <p>Password changed successfully!</p>}
          {successType === "VERIFY_EMAIL" && <p>Email verified successfully!</p>}
          <button onClick={closePopup} title="Close Popup" className="icon-btn ghost">
            <SvgClose />
          </button>
        </aside>
      )}
    </>
  );
}
