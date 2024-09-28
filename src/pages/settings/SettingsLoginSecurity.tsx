import React, { SetStateAction, useState } from "react";

import SvgInfo from "assets/icons/SvgInfo";
import SvgLock from "assets/icons/SvgLock";
import SvgLogin from "assets/icons/SvgLogin";

import CollapseBtn from "src/components/buttons/collapseBtn/CollapseBtn";
import Loader from "src/components/loaders/generalLoader/Loader";

import useFetchDevices from "src/utils/hooks/auth/useFetchDevices";
import { IDevice, demoDevices } from "src/utils/interfaces/auth/IMFA";

import SettingsMFAEdit from "./MFA/MFAEdit";
import MFAEditForm from "./MFA/MFAEditForm";
import SettingsMFANew from "./MFA/MFANew";
import ChangePassword from "./Password/ChangePassword";
import ChooseAuthenticationMethodForm from "./Password/ChooseAuthMethod";
import DeviceAuthenticationPasswordInputForm from "./Password/DeviceAuthenticationPasswordInputForm";
import { SuccessType } from "./Settings";
import "./SettingsLoginSecurity.css";

type LoginInfoFormProps = {
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  setShowErrorModal: React.Dispatch<SetStateAction<boolean>>;
  setErrorSubMsg: React.Dispatch<SetStateAction<string>>;
  loadingStep: boolean;
  setLoadingStep: React.Dispatch<SetStateAction<boolean>>;
  successType: SuccessType;
  setSuccessType: React.Dispatch<SetStateAction<SuccessType>>;
};

export type LoginSecurityViews =
  | "DEFAULT"
  | "CHANGE_PASSWORD"
  | "CHOOSE_METHOD"
  | "INPUT_PASSCODE"
  | "EDIT_DEVICE"
  | "ADD_DEVICE";

export default function SettingsLoginSecurity({
  setShowSuccessModal,
  setShowErrorModal,
  setErrorSubMsg,
  loadingStep,
  setLoadingStep,
  successType,
  setSuccessType,
}: LoginInfoFormProps) {
  const [view, setView] = useState<LoginSecurityViews>("DEFAULT");
  const [isExpanded, setIsExpanded] = useState(true);
  const [invalidPasscode, setInvalidPasscode] = useState(false);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [resendOtpAction, setResendOtpAction] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<IDevice>();
  const [deviceToEdit, setDeviceToEdit] = useState<IDevice | undefined>();
  const [deviceSelectEndPoint, setDeviceSelectEndPoint] = useState("");
  const [deviceAuthenticationEndpoint, setDeviceAuthenticationEndpoint] = useState("");
  const [timeRemainingToRetry, setTimeRemainingToRetry] = useState("");
  const { devices, setDevices, isLoading } = useFetchDevices();

  const [logininformation, setLogininformation] = useState({
    username: "heisenberg08",
    password: "**********",
    newpassword: "**********",
    confirmpassword: "**********",
  });

  const handleClose = () => {
    setResendOtpAction(false);
    setSelectedDevice(undefined);
    setDeviceSelectEndPoint("");
    setLimitExceeded(false);
    setView("DEFAULT");
  };

  const handleChangePasswordFlow = () => {
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      setView("CHOOSE_METHOD");
      setDevices(demoDevices);
    }, 1000);
  };

  const handleSubmitDeviceAuthentication = (
    deviceForAuthentications: IDevice,
    deviceSelectionEndPoint: string,
    action?: string,
  ) => {
    setLoadingStep(true);
    setLimitExceeded(false);

    setTimeout(() => {
      setLoadingStep(false);
      if (action === "resend") {
        setResendOtpAction(true);
      }
      setSelectedDevice(deviceForAuthentications);
      setDeviceSelectEndPoint(deviceSelectionEndPoint);
      setView("INPUT_PASSCODE");
    }, 1000);
  };

  const handleSubmitPasscode = (deviceSelectionEndPoint: string, passcode: string) => {
    setLoadingStep(true);

    setTimeout(() => {
      setLoadingStep(false);
      setView("CHANGE_PASSWORD");
    }, 1000);
  };

  const handleChooseAnotherDevice = () => {
    setLimitExceeded(false);
    setInvalidPasscode(false);
    setResendOtpAction(false);
    setView("CHOOSE_METHOD");
  };

  return (
    <article className="login-info-form">
      {loadingStep && <Loader />}
      <h3 className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <SvgLogin /> Login & Security
        <CollapseBtn isExpanded={isExpanded} setIsExpanded={setIsExpanded} withLabel={false} />
      </h3>

      {isExpanded && (
        <>
          {view === "DEFAULT" && (
            <>
              <div>
                <div className="field-data-group">
                  <div className="field-data">
                    <p className="field-label">Username</p>
                    <p className="field-input">{logininformation?.username}</p>
                    <div className="settings-info">
                      <SvgInfo />
                      <small>At this time, you may not update your username.</small>
                    </div>
                  </div>

                  <div className="field-data">
                    <p className="field-label">Password</p>
                    <p className="field-input">{logininformation.password}</p>
                    <div className="settings-info">
                      <SvgInfo />
                      <small>
                        To change your password, you must verify through one of your existing
                        methods.
                      </small>
                    </div>
                  </div>
                </div>
                <button className="btn-nest primary" onClick={() => {}}>
                  <SvgLock />
                  Change Password
                </button>
              </div>
              <MFAEditForm
                setShowSuccessModal={setShowSuccessModal}
                setShowErrorModal={setShowErrorModal}
                setErrorSubMsg={setErrorSubMsg}
                loadingStep={loadingStep}
                setLoadingStep={setLoadingStep}
                devicesForAuthentications={devices}
                setDevicesForAuthentications={setDevices}
                setDeviceToEdit={setDeviceToEdit}
                setView={setView}
                isLoading={isLoading}
                successType={successType}
                setSuccessType={setSuccessType}
              />
            </>
          )}
          {view === "ADD_DEVICE" && (
            <SettingsMFANew
              setView={setView}
              setLoadingStep={setLoadingStep}
              deviceAuthenticationEndpoint={deviceAuthenticationEndpoint}
              setDeviceAuthenticationEndpoint={setDeviceAuthenticationEndpoint}
              setShowSuccessModal={setShowSuccessModal}
              setShowErrorModal={setShowErrorModal}
              setShowErrorSubMsg={setErrorSubMsg}
              setSuccessType={setSuccessType}
            />
          )}
          {view === "EDIT_DEVICE" && (
            <SettingsMFAEdit
              deviceToEdit={deviceToEdit!}
              setLoadingStep={setLoadingStep}
              deviceAuthenticationEndpoint={deviceAuthenticationEndpoint}
              setDeviceAuthenticationEndpoint={setDeviceAuthenticationEndpoint}
              setShowSuccessModal={setShowSuccessModal}
              setShowErrorModal={setShowErrorModal}
              setShowErrorSubMsg={setErrorSubMsg}
              setView={setView}
              setSuccessType={setSuccessType}
            />
          )}
          {view === "CHOOSE_METHOD" && devices.length > 0 && deviceSelectEndPoint !== "" && (
            <ChooseAuthenticationMethodForm
              devicesForAuthentications={devices}
              deviceSelectEndPoint={deviceSelectEndPoint}
              handleClose={handleClose}
              handleSubmitDeviceAuthentication={handleSubmitDeviceAuthentication}
            />
          )}
          {view === "INPUT_PASSCODE" && deviceSelectEndPoint !== "" && selectedDevice && (
            <DeviceAuthenticationPasswordInputForm
              devicesForAuthentications={devices}
              deviceSelectedForAuthentication={selectedDevice}
              deviceSelectEndPoint={deviceSelectEndPoint}
              handleClose={handleClose}
              handleSubmitPasscode={handleSubmitPasscode}
              invalidPasscode={invalidPasscode}
              handleSubmitDeviceAuthentication={handleSubmitDeviceAuthentication}
              setInvalidPasscode={setInvalidPasscode}
              resendOtpAction={resendOtpAction}
              setResendOtpAction={setResendOtpAction}
              handleChooseAnotherDevice={handleChooseAnotherDevice}
            />
          )}
          {view === "CHANGE_PASSWORD" && (
            <ChangePassword
              setView={setView}
              setShowSuccessModal={setShowSuccessModal}
              setShowErrorModal={setShowErrorModal}
              setErrorSubMsg={setErrorSubMsg}
              loadingStep={loadingStep}
              setLoadingStep={setLoadingStep}
              setSuccessType={setSuccessType}
            />
          )}
        </>
      )}
    </article>
  );
}
