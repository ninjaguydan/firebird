import React, { FormEvent, SetStateAction } from "react";
import { Link } from "react-router-dom";

import MFAButton from "src/components/buttons/mfaBtn/MFAButton";
import MFAButtonAuth from "src/components/buttons/mfaBtn/MFAButtonAuth";

import { DEVICE_TYPES, IDevice, IMfaMethods } from "src/utils/interfaces/auth/IMFA";

type LoginMFACardProps = {
  deviceList: IDevice[];
  selectMethod: (method: keyof IMfaMethods) => void;
};

export default function MFAList({ deviceList, selectMethod }: LoginMFACardProps) {
  return (
    <div className="method list auth">
      <p className="mfa-post-login-flow-text">
        In order to access the portal, you must set up an authentication method to keep your account
        secure.
      </p>
      <p>Select your method or device for authentication.</p>

      {deviceList?.length > 0 ? (
        <>
          {deviceList.map((device) => (
            <MFAButtonAuth
              key={device.id}
              deviceForAuthentications={device}
              onClick={() => selectMethod(device.type)}
            />
          ))}
        </>
      ) : (
        <>
          {DEVICE_TYPES.map((type) => (
            <MFAButton key={type} type={type} onClick={() => selectMethod(type)} />
          ))}
        </>
      )}
      <Link to="/login" className="btn-nest ghost">
        Cancel
      </Link>
    </div>
  );
}
