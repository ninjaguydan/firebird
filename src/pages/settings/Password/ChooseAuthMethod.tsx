import React from "react";

import PING from "assets/images/image 1.png";

import MFAButtonAuth from "src/components/buttons/mfaBtn/MFAButtonAuth";

import { IDevice } from "src/utils/interfaces/auth/IMFA";

type ChooseAuthMethodProps = {
  devicesForAuthentications: IDevice[];
  deviceSelectEndPoint: string;
  handleClose: () => void;
  handleSubmitDeviceAuthentication: (
    deviceForAuthentications: IDevice,
    deviceSelectionEndPoint: string,
    action?: string,
  ) => void;
};

const ChooseAuthenticationMethodForm = ({
  devicesForAuthentications,
  deviceSelectEndPoint,
  handleClose,
  handleSubmitDeviceAuthentication,
}: ChooseAuthMethodProps) => {
  return (
    <div className="mfa-select-form">
      <div className="mfa-header vertical">
        <img src={PING} alt="" className="mfa-logo" />
        <h3>Password Change</h3>
      </div>
      <p className="mfa-subheader">Select your method or device for authentication</p>

      <div className="device-box-container">
        {devicesForAuthentications.map((deviceForAuthentications) => {
          return (
            deviceForAuthentications.status === "ACTIVE" && (
              <MFAButtonAuth
                key={deviceForAuthentications.type}
                deviceForAuthentications={deviceForAuthentications}
                onClick={() =>
                  handleSubmitDeviceAuthentication(deviceForAuthentications, deviceSelectEndPoint)
                }
              />
            )
          );
        })}
      </div>
      <button className="btn-nest secondary" onClick={handleClose}>
        Cancel
      </button>
    </div>
  );
};

export default ChooseAuthenticationMethodForm;
