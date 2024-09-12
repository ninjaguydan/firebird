import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import PING from "assets/images/image 1.png";

import "src/pages/mfa/mfa.css";

import { IDevice, IMfaMethods } from "src/utils/interfaces/auth/IMFA";

export default function MFA() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loadingStep, setLoadingStep] = useState(false);
  const [resendOtpAction, setResendOtpAction] = useState(false);

  const [method, setMethod] = useState<keyof IMfaMethods | null>(location?.state?.method);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [showErrorSubMsg, setShowErrorSubMsg] = useState("");
  const [errorType, setErrorType] = useState("");

  const [devicesForAuthentications, setDevicesForAuthentications] = useState<IDevice[]>(
    location?.state?.deviceList,
  );
  const [deviceSelectedForAuthentication, setDeviceSelectedForAuthentication] = useState<IDevice>(
    location?.state?.deviceSelectedForAuthentication,
  );
  const [deviceSelectEndPoint, setDeviceSelectEndPoint] = useState(
    location?.state?.deviceSelectEndPoint,
  );
  const [deviceAuthenticationEndpoint, setDeviceAuthenticationEndpoint] = useState(
    location?.state?.otpCheckEndpoint,
  );
  const [mfaFlow, setMFAFlow] = useState(
    sessionStorage.getItem("mfaFlow") !== null
      ? sessionStorage.getItem("mfaFlow")
      : location?.state?.mfaFlow,
  );
  const [completeMFASetupPostLogin, setCompleteMFASetupPostLogin] = useState(
    sessionStorage.getItem("completeMFASetupPostLogin") !== null
      ? Boolean(sessionStorage.getItem("completeMFASetupPostLogin"))
      : false,
  );
  const [secretValues, setSecretValues] = useState({});
  const [passcodeReady, setPasscodeReady] = useState(false);
  const [resentPasscode, setResentPasscode] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionToken, setSessionToken] = useState(
    location?.state?.sessionToken !== null && location?.state?.sessionToken !== undefined
      ? location?.state?.sessionToken
      : "",
  );
  const [flowId, setFlowId] = useState(
    location?.state?.flowId !== null && location?.state?.flowId !== undefined
      ? location?.state?.flowId
      : "",
  );
  useExitPrompt(true);

  const onRedirect = () => {
    if (mfaFlow === "MFA-POST-LOGIN-NEW" || mfaFlow === "MFA-PRE-LOGIN-EXISTING") {
      setShowWarning(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (mfaFlow !== undefined && mfaFlow !== "") {
      if (mfaFlow === "MFA-PRE-LOGIN-EXISTING" || mfaFlow === "MFA-POST-LOGIN-NEW") {
        if (mfaFlow === "MFA-POST-LOGIN-NEW") {
          sessionStorage.setItem("mfaFlowRequired", "MFA-SETUP-REQUIRED");
        }
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [mfaFlow]);

  useEffect(() => {
    if (completeMFASetupPostLogin && mfaFlow === "MFA-POST-LOGIN-NEW") {
      sessionStorage.removeItem("mfaFlowRequired");
      navigate("/home");
    }
  }, [completeMFASetupPostLogin]);

  const handleRedirect = () => {
    if (mfaFlow === "MFA-POST-LOGIN-NEW") {
      handleDeleteDevice(deviceAuthenticationEndpoint);
    } else {
      handleResetFlow();
    }
  };

  const handleDeleteDevice = (deviceActivationEndpoint: string) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (
      accessToken !== null &&
      accessToken !== "" &&
      accessToken !== undefined &&
      deviceActivationEndpoint !== null &&
      deviceActivationEndpoint !== "" &&
      deviceActivationEndpoint !== undefined
    ) {
      axios
        .get(deviceActivationEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.status !== "ACTIVE") {
            deleteDeviceAction(deviceActivationEndpoint, accessToken);
          }
        })
        .catch((err) => {
          deleteDeviceAction(deviceActivationEndpoint, accessToken);
        });
    } else {
      logOut("signOut");
    }
  };

  const deleteDeviceAction = (deviceActivationEndpoint: string, accessToken: string) => {
    axios
      .delete(deviceActivationEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((respond) => {
        if (respond.status === 204) {
          logOut("signOut");
        }
      })
      .catch((err) => {
        logOut("signOut");
      });
  };
  const modalContent: GeneralModalContent = {
    header: "Are you sure?",
    message:
      mfaFlow === "MFA-POST-LOGIN-NEW"
        ? "If you exit now, you will be prompted to setup multi-factor authentication when trying to log in again"
        : "This will redirect you to the Sign in page and you will have to go through the Sign in process again to access the application",
    btnLabel: "Continue editing",
    actionBtn: {
      label: mfaFlow === "MFA-POST-LOGIN-NEW" ? "Exit MFA Setup" : "Exit Sign in",
      action: () => handleRedirect(),
    },
  };

  const handleResetFlow = () => {
    setLoadingStep(true);
    if (flowId !== "") {
      var resetFlowUrl = ping_auth_reset_flow_endpoint;
      axios
        .post(resetFlowUrl, {
          url: `${auth_endpoint}/flows/${flowId}`,
          session_token: sessionToken,
        })
        .then(async (response) => {
          var statusCode = response?.data?.statusCode;
          if (statusCode === 200) {
            var accessToken = await fetchAccessToken(setLoadingStep, setShowErrorModal);
            var pingAuthResetSessionTokenUrl = ping_auth_reset_session_token_endpoint;
            if (accessToken && accessToken !== undefined && accessToken !== "") {
              handleResetSessionToken(pingAuthResetSessionTokenUrl, accessToken);
            } else {
              setLoadingStep(false);
              navigate("/login");
            }
          } else {
            setLoadingStep(false);
            navigate("/login");
          }
        })
        .catch((err) => {
          setLoadingStep(false);
          navigate("/login");
        });
    } else {
      setLoadingStep(false);
      navigate("/login");
    }
  };

  const handleResetSessionToken = (apiUrl: string, accessToken: string) => {
    axios
      .post(apiUrl, {
        url: `${api_endpoint}/sessions/me`,
        access_token: accessToken,
        session_token: sessionToken,
      })
      .then((response) => {
        setLoadingStep(false);
        var statusCode = response?.data?.statusCode;
        if (statusCode === 204) {
          navigate("/login");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoadingStep(false);
        navigate("/login");
      });
  };

  const handleResumeFlow = (apiUrl: string, requestBody: object) => {
    axios
      .post(apiUrl, requestBody)
      .then((res) => {
        var apiResponse = JSON.parse(res?.data?.body);
        var statusCode = res?.data?.statusCode;
        if (statusCode === 200) {
          var authorizeResponse = apiResponse?.authorizeResponse;
          sessionStorage.setItem("authToken", authorizeResponse?.access_token);
          handleFetchTokens(authorizeResponse?.code);
        } else if (statusCode === 400) {
          setLoadingStep(false);
          if (apiResponse?.details[0]?.code) {
            setShowErrorModal(true);
            setErrorMsg(apiResponse?.details[0]?.message);
          } else {
            setShowErrorModal(true);
          }
        } else if (statusCode === 500) {
          setLoadingStep(false);
          setShowErrorModal(true);
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((err) => {
        setLoadingStep(false);
        setShowErrorModal(true);
      });
  };

  const handleFetchTokens = (code: string) => {
    var requestBody = {
      grant_type: "authorization_code",
      client_id: client_id,
      code: code,
    };
    axios
      .post(token_endpoint, requestBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async (res) => {
        var accessToken = await fetchAccessToken(setLoadingStep, setShowErrorModal);
        if (accessToken !== null && accessToken !== undefined && accessToken !== "") {
          var authToken = res?.data?.access_token;
          var refreshToken = res?.data?.refresh_token;
          if (authToken && refreshToken) {
            sessionStorage.setItem("authToken", authToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("accessToken", accessToken);
            navigate("/loginredirect");
          }
        }
      })
      .catch((err) => {
        setLoadingStep(false);
        if (err?.response) {
          if (err?.response?.status === 400) {
            if (err?.response?.data.details[0]?.code) {
              setShowErrorModal(true);
              setErrorMsg(err?.response?.data?.details[0]?.message);
            } else {
              setShowErrorModal(true);
            }
          } else {
            setShowErrorModal(true);
          }
        } else {
          setShowErrorModal(true);
        }
      });
  };

  const selectMethod = async (
    e: any,
    method: keyof IMfaMethods,
    status: "NEW" | "EXISTING",
    device?: IDevice,
    action?: string,
  ) => {
    e.preventDefault();
    const deviceSelectAuthenticationEndpoint =
      deviceSelectEndPoint !== "" ? deviceSelectEndPoint : "";
    if (status === "EXISTING") {
      setLoadingStep(true);
      if (
        deviceSelectAuthenticationEndpoint !== "" &&
        deviceSelectAuthenticationEndpoint !== null &&
        deviceSelectAuthenticationEndpoint !== undefined &&
        sessionToken !== undefined &&
        sessionToken &&
        sessionToken !== ""
      ) {
        if (device !== undefined) {
          var pingAuthDeviceSelectUrl = ping_auth_device_select_endpoint;
          axios
            .post(pingAuthDeviceSelectUrl, {
              url: deviceSelectAuthenticationEndpoint,
              device_id: device?.id,
              session_token: sessionToken,
            })
            .then((response) => {
              setLoadingStep(false);
              var apiResponse = JSON.parse(response?.data?.body);
              var statusCode = response?.data?.statusCode;
              const status = apiResponse.status;
              if (
                mfaFlow === "MFA-PRE-LOGIN-EXISTING" &&
                apiResponse?.id !== undefined &&
                apiResponse !== null
              ) {
                setFlowId(apiResponse?.id);
              }
              if (statusCode === 200) {
                if (status === "OTP_REQUIRED") {
                  setMethod(method);
                  setDeviceSelectedForAuthentication(device);
                  if (action === "resend") {
                    setResendOtpAction(true);
                  }
                }
              } else if (statusCode === 400) {
                if (apiResponse?.details[0]?.code) {
                  setShowErrorModal(true);
                  setShowErrorMsg(
                    apiResponse?.details[0]?.target + " : " + apiResponse?.details[0]?.message,
                  );
                }
              } else if (statusCode === 500) {
                if (apiResponse?.code === "UNEXPECTED_ERROR") {
                  setShowErrorModal(true);
                  setErrorType("seriousErrorStatus");
                  setShowErrorMsg("Timeout error : Please initiate the process again!");
                } else {
                  setShowErrorModal(true);
                  setShowErrorMsg(apiResponse?.message);
                }
              } else if (statusCode === 401) {
                setShowErrorModal(true);
                setErrorType("seriousErrorStatus");
                setShowErrorMsg("Some error");
              } else if (statusCode === 404) {
                setShowErrorModal(true);
                setErrorType("seriousErrorStatus");
              } else {
                setShowErrorModal(true);
                setShowErrorMsg("Some error");
              }
            })
            .catch((err) => {
              setLoadingStep(false);
              setShowErrorModal(true);
            });
        } else {
          setLoadingStep(false);
          setShowErrorModal(true);
          setShowErrorMsg("Some error");
        }
      } else {
        setLoadingStep(false);
        setShowErrorModal(true);
        setShowErrorMsg("Some error");
      }
    } else if (status === "NEW") {
      setMethod(method);
    }
  };

  const handleChangeMethod = (
    status: "NEW" | "EXISTING",
    handleDeleteDevice?: (deviceSelectEndPoint: string) => void,
  ) => {
    if (status === "NEW") {
      handleDeleteDevice!(deviceSelectEndPoint);
    }
    setMethod(null);
  };

  useEffect(() => {
    if (resentPasscode) {
      let timeout = setTimeout(() => {
        setResentPasscode(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [resentPasscode]);

  async function handleCreateDevice(
    accessToken: string,
    type: keyof IMfaMethods,
    userId: string,
    email: string,
    phoneNum: string,
    action: string,
  ) {
    setLoadingStep(true);
    let mfaSetUpRequestBody = {
      type: type,
      email: type === "EMAIL" ? email : null,
      phone: type === "SMS" || type === "VOICE" ? `+1${phoneNum}` : null,
      policy: {
        id: mfa_policy_id,
      },
      status: "ACTIVATION_REQUIRED",
    };
    axios
      .post(`${api_endpoint}/users/${userId}/devices`, mfaSetUpRequestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setLoadingStep(false);
        var apiResponse = res.data;
        var deviceActivationEndpoint = apiResponse["_links"]["self"]["href"];
        if (method === "TOTP") {
          var secret = apiResponse["secret"];
          var secretUrl = apiResponse["keyUri"];
          setSecretValues({
            ...secretValues,
            secretKey: secret,
            secretUrl: secretUrl,
          });
        }
        if (action === "resend") {
          setResentPasscode(true);
        }
        setPasscodeReady(true);
        setDeviceAuthenticationEndpoint(deviceActivationEndpoint);
      })
      .catch((err) => {
        setLoadingStep(false);
        setError(true);
        if (err?.response) {
          if (err?.response?.status === 400) {
            if (
              err?.response?.data?.details[0]?.code === "INVALID_VALUE" &&
              err?.response?.data?.details[0]?.target === "phone"
            ) {
              setErrorMsg("Invalid phone number format!");
            } else if (err?.response?.data?.details[0]?.code) {
              setError(err?.response?.data?.details[0]?.message);
            } else {
              setShowErrorModal(true);
              setShowErrorSubMsg("We were unable to complete the device pairing!");
            }
          } else if (
            (err?.response?.status === 404 && err?.response?.statusText === "Not Found") ||
            err?.response?.status === 401
          ) {
            setShowErrorModal(true);
            setErrorType("seriousErrorStatus");
          } else {
            setShowErrorModal(true);
            setShowErrorSubMsg("We were unable to complete the device pairing!");
          }
        } else {
          setShowErrorModal(true);
          setShowErrorSubMsg("We were unable to complete the device pairing!");
        }
      });
  }

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setShowErrorMsg("");
    setErrorType("");
    if (errorType === "seriousErrorStatus") {
      navigate("/login");
    }
  };

  return (
    <div id="login-page">
      <Hero />
      <section className="login-actions">
        {loadingStep && <Loader />}
        <ErrorModal
          showModal={showErrorModal}
          closeModal={handleCloseModal}
          errorMessage={showErrorMsg}
          type={errorType}
        />
        <GeneralModal
          modalContent={modalContent}
          closeModal={() => setShowWarning(false)}
          showModal={showWarning}
        />
        <article className="login-card login-mfa">
          <h1 className="login-card-title">
            <img src={PING} alt="" className="mfa-logo" /> Multi-factor authentication
          </h1>
          {method === null && (
            <LoginMFAList
              devicesForAuthentications={devicesForAuthentications}
              selectMethod={selectMethod}
              mfaFlow={mfaFlow}
              onRedirect={onRedirect}
            />
          )}
          {devicesForAuthentications?.length > 0 ? (
            <LoginMFAExisiting
              method={method}
              selectMethod={selectMethod}
              handleChangeMethod={handleChangeMethod}
              resendOtpAction={resendOtpAction}
              setResendOtpAction={setResendOtpAction}
              devicesForAuth={devicesForAuthentications}
              deviceSelectedForAuthentication={deviceSelectedForAuthentication!}
              deviceSelectionEndPoint={deviceSelectEndPoint}
              handleResumeFlow={handleResumeFlow}
              sessionToken={sessionToken}
              onRedirect={onRedirect}
            />
          ) : (
            <LoginMFANew
              method={method}
              passcodeReady={passcodeReady}
              setPasscodeReady={setPasscodeReady}
              resentPasscode={resentPasscode}
              setResentPasscode={setResentPasscode}
              error={error}
              setError={setError}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              handleChangeMethod={handleChangeMethod}
              deviceAuthenticationEndpoint={deviceAuthenticationEndpoint}
              handleCreateDevice={handleCreateDevice}
              secretValues={secretValues}
              onRedirect={onRedirect}
              mfaFlow={mfaFlow}
              completeMFASetupPostLogin={completeMFASetupPostLogin}
              setCompleteMFASetupPostLogin={setCompleteMFASetupPostLogin}
            />
          )}
        </article>
      </section>
    </div>
  );
}
