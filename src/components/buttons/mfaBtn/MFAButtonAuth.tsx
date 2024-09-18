import React from "react";

import { IDevice, MFA_METHODS } from "src/utils/interfaces/auth/IMFA";

import MFAButtonIcon from "./MFAButtonIcon";

type MFAButtonProps = {
  deviceForAuthentications: IDevice;
  className?: string;
  onClick: (e: any) => void;
};

export default function MFAButtonAuth({
  deviceForAuthentications,
  className,
  onClick,
}: MFAButtonProps) {
  const setText = () => {
    switch (deviceForAuthentications.type) {
      case "EMAIL":
        return deviceForAuthentications.email;
      case "TOTP":
        return "";
      default:
        return deviceForAuthentications.phone;
    }
  };
  return (
    <button className={`mfa-btn auth ${className}`} onClick={onClick}>
      <MFAButtonIcon method={deviceForAuthentications.type} />
      <div className="btn-content">
        <h3>{MFA_METHODS[deviceForAuthentications.type].heading}</h3>
        <p>{setText()}</p>
      </div>
    </button>
  );
}
