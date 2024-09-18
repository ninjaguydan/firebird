import React from "react";

import "src/components/buttons/mfaBtn/mfa-button.css";

import { IMfaMethods, MFA_METHODS } from "src/utils/interfaces/auth/IMFA";

import MFAButtonIcon from "./MFAButtonIcon";

type MFAButtonProps = {
  type: keyof IMfaMethods;
  className?: string;
  onClick: (e: any) => void;
};

export default function MFAButton({ type, className, onClick }: MFAButtonProps) {
  return (
    <button className={`mfa-btn ${className}`} onClick={onClick}>
      <MFAButtonIcon method={type} />
      <div className="btn-content">
        <h3>{MFA_METHODS[type].heading}</h3>
        <p>{MFA_METHODS[type].desc}</p>
      </div>
    </button>
  );
}
