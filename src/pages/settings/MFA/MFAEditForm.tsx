import React, { SetStateAction, useEffect } from "react";

import SvgAdd from "assets/icons/SvgAdd";
import SvgInfo from "assets/icons/SvgInfo";
import PING from "assets/images/image 1.png";

import MFADeviceRowLoader from "src/components/loaders/mfaDeviceRowLoader/MFADeviceRowLoader";

import useFetchDevices from "src/utils/hooks/auth/useFetchDevices";
import { IDevice } from "src/utils/interfaces/auth/IMFA";

import { SuccessType } from "../Settings";
import { LoginSecurityViews } from "../SettingsLoginSecurity";
import "./MFAEdit.css";
import MFAEditDevice from "./MFAEditDevice";

type MFAEditProps = {
  devicesForAuthentications: IDevice[];
  setDevicesForAuthentications: React.Dispatch<SetStateAction<IDevice[]>>;
  setDeviceToEdit: React.Dispatch<SetStateAction<IDevice | undefined>>;
  setView: React.Dispatch<SetStateAction<LoginSecurityViews>>;
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorModal: React.Dispatch<SetStateAction<boolean>>;
  setErrorSubMsg: React.Dispatch<SetStateAction<string>>;
  successType: SuccessType;
  setSuccessType: React.Dispatch<SetStateAction<SuccessType>>;
  loadingStep: boolean;
  setLoadingStep: React.Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

export default function MFAEditForm({
  devicesForAuthentications,
  setDevicesForAuthentications,
  setDeviceToEdit,
  setView,
  setShowSuccessModal,
  setShowErrorModal,
  setErrorSubMsg,
  loadingStep,
  setLoadingStep,
  isLoading,
  successType,
  setSuccessType,
}: MFAEditProps) {
  const { devices } = useFetchDevices();
  useEffect(() => {
    if (successType === "ADD_MFA_DEVICE" || successType === "EDIT_MFA_DEVICE") {
      setDevicesForAuthentications(devices);
    }
  }, [successType, devices]);

  const handleEdit = (device: IDevice) => {
    setView("EDIT_DEVICE");
    setDeviceToEdit(device);
  };
  return (
    <div className="mfa-edit-form">
      <div className="mfa-header">
        <img src={PING} alt="" className="mfa-logo" />
        <h3>Multi-factor authentication</h3>
      </div>
      <p className="mfa-subheader">
        Multi-factor authentication (MFA) is used to keep your account secure when logging into the
        portal. Manage your existing methods which are listed below, or add a new method.
      </p>
      <div className="mfa-edit-devices">
        {isLoading ? (
          <>
            <MFADeviceRowLoader />
            <MFADeviceRowLoader />
            <MFADeviceRowLoader />
            <MFADeviceRowLoader />\
          </>
        ) : (
          <>
            {devicesForAuthentications.map((device) => (
              <MFAEditDevice
                key={device.id}
                devicesForAuthentications={devicesForAuthentications}
                setDevicesForAuthentications={setDevicesForAuthentications}
                setShowSuccessModal={setShowSuccessModal}
                setShowErrorModal={setShowErrorModal}
                setErrorSubMsg={setErrorSubMsg}
                loadingStep={loadingStep}
                setLoadingStep={setLoadingStep}
                device={device}
                selectDevice={() => handleEdit(device)}
                setSuccessType={setSuccessType}
              />
            ))}
          </>
        )}
        <div className="mfa-user-info">
          {(devicesForAuthentications.length === 1 || devicesForAuthentications.length === 5) && (
            <div className="settings-info">
              <SvgInfo />
              {devicesForAuthentications.length === 5 && (
                <small>
                  Maximum authentication devices reached. If you would like to edit / add a new
                  method, please delete an existing method first.
                </small>
              )}
              {devicesForAuthentications.length === 1 && (
                <small>
                  You must have at least one other device / method enrolled before deleting any
                  other.
                </small>
              )}
            </div>
          )}
          <button
            className="btn-nest primary"
            onClick={() => setView("ADD_DEVICE")}
            disabled={devicesForAuthentications.length === 5 ? true : false}
          >
            <SvgAdd /> New Device
          </button>
        </div>
      </div>
    </div>
  );
}
