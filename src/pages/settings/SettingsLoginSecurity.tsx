import React, { SetStateAction, useState } from "react";

import SvgInfo from "assets/icons/SvgInfo";
import SvgLock from "assets/icons/SvgLock";
import SvgLogin from "assets/icons/SvgLogin";

import CollapseBtn from "src/components/buttons/collapseBtn/CollapseBtn";
import Loader from "src/components/loaders/Loader";

import useFetchDevices from "src/utils/hooks/auth/useFetchDevices";
import { IDevice } from "src/utils/interfaces/auth/IMFA";

import { SuccessType } from "./Settings";

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
  setShowErrorType,
  loadingStep,
  setLoadingStep,
  successType,
  setSuccessType,
  setShowMFAAppList,
}: LoginInfoFormProps) {
  const [view, setView] = useState<LoginSecurityViews>("DEFAULT");
  const [isExpanded, setIsExpanded] = useState(true);
  const [invalidPasscode, setInvalidPasscode] = useState(false);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [resendOtpAction, setResendOtpAction] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({});
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
    setSelectedDevice({});
    setDeviceSelectEndPoint("");
    setLimitExceeded(false);
    setView("DEFAULT");
  };

  const handleChangePasswordFlow = () => {
    setLoadingStep(true);
    const accessToken = sessionStorage.getItem("accessToken");
    const userData = JSON.parse(sessionStorage.getItem("userInfo")!);
    const deviceAuthenticationEndpoint = `${auth_endpoint}/deviceAuthentications`;
    if (accessToken && accessToken !== undefined && userData && userData !== undefined) {
      axios
        .post(
          deviceAuthenticationEndpoint,
          {
            user: {
              id: userData["p1.userId"],
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          setLoadingStep(false);
          const status = response.data.status;
          if (status === "DEVICE_SELECTION_REQUIRED") {
            setView("CHOOSE_METHOD");
            const devicesArrays = response.data["_embedded"]["devices"];
            const deviceSelectEndPoint = response.data["_links"]["device.select"]["href"];
            setDevices(devicesArrays);
            setDeviceSelectEndPoint(deviceSelectEndPoint);
          } else if (status === "OTP_REQUIRED") {
            const devicesArrays = response.data["_embedded"]["devices"];
            const deviceSelectEndPoint = response.data["_links"]["device.select"]["href"];
            setSelectedDevice(devicesArrays[0]);
            setDeviceSelectEndPoint(deviceSelectEndPoint);
            setView("INPUT_PASSCODE");
          }
        })
        .catch((err) => {
          setLoadingStep(false);
          if (err?.response) {
            if (err?.response?.status === 400) {
              if (err?.response?.data.details[0]?.code === "NO_USABLE_DEVICES") {
                setShowErrorModal(true);
                setShowErrorType("seriousErrorStatus");
                setErrorSubMsg(
                  `Couldn't find authenticating device for user : ${userData["username"]}`,
                );
              } else {
                setShowErrorModal(true);
                setErrorSubMsg(
                  err?.response?.data.details[0]?.target +
                    " : " +
                    err?.response?.data.details[0]?.message,
                );
              }
            } else if (err?.response?.status === 500) {
              if (err?.response?.data.details[0]?.code === "UNEXPECTED_ERROR") {
                setShowErrorModal(true);
                setShowErrorType("seriousErrorStatus");
                setErrorSubMsg("Timeout error : Please initiate the process again!");
              } else {
                setShowErrorModal(true);
                setErrorSubMsg(err?.response?.data?.message);
              }
            } else {
              setShowErrorModal(true);
              setErrorSubMsg("Some error");
            }
          } else {
            setShowErrorModal(true);
            setErrorSubMsg("Some error");
          }
        });
    }
  };

  const handleSubmitDeviceAuthentication = (
    deviceForAuthentications: IDevice,
    deviceSelectionEndPoint: string,
    action?: string,
  ) => {
    setLoadingStep(true);
    setLimitExceeded(false);
    const accessToken = sessionStorage.getItem("accessToken");
    const userData = JSON.parse(sessionStorage.getItem("userInfo")!);
    const deviceSelectAuthenticationEndpoint = deviceSelectionEndPoint;
    if (accessToken && accessToken !== undefined && userData && userData !== undefined) {
      axios
        .post(
          deviceSelectAuthenticationEndpoint,
          {
            device: {
              id: deviceForAuthentications.id,
            },
            compatibility: "FULL",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/vnd.pingidentity.device.select+json",
            },
          },
        )
        .then((response) => {
          setLoadingStep(false);
          const status = response.data.status;
          if (status === "OTP_REQUIRED") {
            if (action === "resend") {
              setResendOtpAction(true);
            }
            setSelectedDevice(deviceForAuthentications);
            setDeviceSelectEndPoint(deviceSelectionEndPoint);
            setView("INPUT_PASSCODE");
          }
        })
        .catch((err) => {
          setLoadingStep(false);
          if (err?.response) {
            if (err?.response?.status === 400) {
              if (err?.response?.data.details[0]?.code) {
                setShowErrorModal(true);
                setErrorSubMsg(
                  err?.response?.data.details[0]?.target +
                    " : " +
                    err?.response?.data.details[0]?.message,
                );
              }
            } else if (err?.response?.status === 500) {
              if (err?.response?.data?.code === "UNEXPECTED_ERROR") {
                setShowErrorModal(true);
                setShowErrorType("seriousErrorStatus");
                setErrorSubMsg("Timeout error : Please initiate the process again!");
              } else {
                setShowErrorModal(true);
                setErrorSubMsg(err?.response?.data?.message);
              }
            } else {
              setShowErrorModal(true);
              setErrorSubMsg("Some error");
            }
          } else {
            setShowErrorModal(true);
            setErrorSubMsg("Some error");
          }
        });
    }
  };

  const handleSubmitPasscode = (deviceSelectionEndPoint: string, passcode: string) => {
    setLoadingStep(true);
    const accessToken = sessionStorage.getItem("accessToken");
    const userData = JSON.parse(sessionStorage.getItem("userInfo")!);
    const deviceSelectAuthenticationEndpoint = deviceSelectionEndPoint;
    if (accessToken && accessToken !== undefined && userData && userData !== undefined) {
      axios
        .post(
          deviceSelectAuthenticationEndpoint,
          {
            otp: passcode,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/vnd.pingidentity.otp.check+json",
            },
          },
        )
        .then((response) => {
          setLoadingStep(false);
          setView("CHANGE_PASSWORD");
        })
        .catch((err) => {
          setLoadingStep(false);
          if (err?.response) {
            if (err?.response?.status === 400) {
              if (err?.response?.data?.details[0]?.code === "INVALID_OTP") {
                setLimitExceeded(false);
                setInvalidPasscode(true);
              } else if (err?.response?.data?.details[0]?.code === "QUOTA_EXCEEDED") {
                setLimitExceeded(true);
                setInvalidPasscode(false);
                if (err?.response?.data?.details[0]?.innerError?.coolDownExpiresAt > 0) {
                  setTimeRemainingToRetry(
                    err?.response?.data?.details[0]?.innerError?.coolDownExpiresAt,
                  );
                }
              } else {
                setShowErrorModal(true);
                setErrorSubMsg(err?.response?.data?.details[0]?.message);
              }
            } else if (err?.response?.status === 500) {
              if (err?.response?.data?.code === "UNEXPECTED_ERROR") {
                setShowErrorModal(true);
                setShowErrorType("seriousErrorStatus");
                setErrorSubMsg("Timeout error : Please initiate the process again!");
              } else {
                setShowErrorModal(true);
                setErrorSubMsg(err?.response?.data?.message);
              }
            } else {
              setShowErrorModal(true);
              setErrorSubMsg("Some error");
            }
          } else {
            setShowErrorModal(true);
            setErrorSubMsg("Some error");
          }
        });
    }
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
                <button className="btn-nest primary" onClick={handleChangePasswordFlow}>
                  <SvgLock />
                  Change Password
                </button>
              </div>
              <MFAEditForm
                setShowSuccessModal={setShowSuccessModal}
                setShowErrorModal={setShowErrorModal}
                setErrorSubMsg={setErrorSubMsg}
                setShowErrorType={setShowErrorType}
                loadingStep={loadingStep}
                setLoadingStep={setLoadingStep}
                devicesForAuthentications={devices}
                setDevicesForAuthentications={setDevices}
                setDeviceToEdit={setDeviceToEdit}
                setView={setView}
                isLoading={isLoading}
                successType={successType}
                setSuccessType={setSuccessType}
                setShowMFAAppList={setShowMFAAppList}
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
              setErrorType={setShowErrorType}
              setSuccessType={setSuccessType}
              setShowMFAAppList={setShowMFAAppList}
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
              setErrorType={setShowErrorType}
              setView={setView}
              setSuccessType={setSuccessType}
              setShowMFAAppList={setShowMFAAppList}
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
          {view === "INPUT_PASSCODE" &&
            deviceSelectEndPoint !== "" &&
            Object.keys(selectedDevice).length > 0 && (
              <DeviceAuthenticationPasswordInputForm
                devicesForAuthentications={devices}
                handleClose={handleClose}
                handleSubmitPasscode={handleSubmitPasscode}
                invalidPasscode={invalidPasscode}
                limitExceeded={limitExceeded}
                setLimitExceeded={setLimitExceeded}
                timeRemainingToRetry={timeRemainingToRetry}
                setTimeRemainingToRetry={setTimeRemainingToRetry}
                deviceSelectEndPoint={deviceSelectEndPoint}
                deviceSelectedForAuthentication={selectedDevice}
                handleSubmitDeviceAuthentication={handleSubmitDeviceAuthentication}
                setInvalidPasscode={setInvalidPasscode}
                resendOtpAction={resendOtpAction}
                setResendOtpAction={setResendOtpAction}
                handleChooseAnotherDevice={handleChooseAnotherDevice}
              />
            )}
          {view === "CHANGE_PASSWORD" && (
            <ChangePasswordForm
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
