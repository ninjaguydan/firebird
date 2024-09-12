import React, { SetStateAction, useEffect, useState } from "react";

import SvgCheck from "assets/icons/SvgCheck";
import SvgClose from "assets/icons/SvgClose";
import SvgSuccess from "assets/icons/SvgSuccess";

import NestInput from "src/components/inputs/nestInput/NestInput";
import Loader from "src/components/loaders/Loader";
import ErrorModal from "src/components/modals/errorModal/ErrorModal";

import { ContactInfo } from "src/utils/interfaces/registration/IContactInfo";
import {
  IRegistrationSteps,
  PASSWORD_SETUP,
  PERSONAL_INFO,
} from "src/utils/interfaces/registration/IRegistrationSteps";
import { validateEmail } from "src/utils/validators/validators";

type EmailVerificationpProps = {
  onRedirect: () => void;
  contact: ContactInfo;
  setContact: React.Dispatch<SetStateAction<ContactInfo>>;
  setCurrentStep: React.Dispatch<SetStateAction<keyof IRegistrationSteps>>;
};

export default function RegistrationEmailVerfy({
  onRedirect,
  contact,
  setContact,
  setCurrentStep,
}: EmailVerificationpProps) {
  const [code, setCode] = useState("");
  const [tempEmail, setTempEmail] = useState(contact.email);
  const [errorObject, setErrorObject] = useState({
    email: "",
    code: "",
  });

  const [resentPasscode, setResentPasscode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [loadingStep, setLoadingStep] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorObject((errorObject) => ({
      ...errorObject,
      code: "",
    }));
    setCode(e.target.value);
  };

  const handleResend = async () => {
    setResentPasscode(true);
    setCode("");
  };

  const onChangeEmail = () => {
    setCode("");
    setErrorObject({
      code: "",
      email: "",
    });
    setEmailEditMode(true);
    setResentPasscode(false);
  };

  const handleEmailEditClose = async (action: "EXIT" | "SAVE") => {
    if (action === "EXIT") {
      setErrorObject((errorObject) => ({
        ...errorObject,
        email: "",
      }));
      setTempEmail(contact.email);
      setEmailEditMode(false);
    }

    if (action === "SAVE") {
      setLoadingStep(true);

      setErrorObject((errorObject) => ({
        ...errorObject,
        email: validateEmail(tempEmail),
      }));

      setTimeout(() => {
        setLoadingStep(false);

        if (validateEmail(tempEmail) === "") {
          setEmailEditMode(false);
          setCode("");
          setContact({ ...contact, email: tempEmail });
          setTempEmail(tempEmail);
        }
      }, 3000);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStep(true);

    setTimeout(() => {
      setLoadingStep(false);
      setTempEmail(tempEmail);
      setCurrentStep(PASSWORD_SETUP);
    }, 3000);
  };

  useEffect(() => {
    if (resentPasscode) {
      const timeout = setTimeout(() => {
        setResentPasscode(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [resentPasscode]);

  return (
    <section className="email-verify">
      {loadingStep && <Loader />}

      <div className="form-header">
        <p>Please check your email.</p>
        <p className="subtext">
          Look for the verification email that has been sent to{" "}
          <span className="highlight">{` ${contact.email || ""} `}</span>
          and enter the code below.
        </p>
      </div>

      <form onSubmit={(e) => handleVerify(e)}>
        <NestInput
          label="Verification code"
          value={code}
          onChange={handleCodeChange}
          type="password"
          id="verify"
          error={errorObject?.code}
          disabled={emailEditMode}
        />

        {emailEditMode ? (
          <div className="email-input-group">
            <NestInput
              label="Email Address"
              onChange={(e) => {
                setErrorObject((errorObject) => ({
                  ...errorObject,
                  email: validateEmail(tempEmail),
                }));
                setTempEmail(e.target.value);
              }}
              value={tempEmail}
              error={errorObject.email}
              id={"email"}
              type="email"
              autoFocus={true}
              className="inline"
            />
            <div className="edit-email-btn-group">
              <button
                type="button"
                onClick={() => handleEmailEditClose("EXIT")}
                className="btn-nest ghost"
                title="Exit without saving"
              >
                <SvgClose /> Close
              </button>
              <button
                type="button"
                onClick={() => handleEmailEditClose("SAVE")}
                className="btn-nest ghost"
                title="Save new email"
                disabled={errorObject.email !== ""}
              >
                <SvgCheck className="save-icon" /> Save
              </button>
            </div>
          </div>
        ) : (
          <div className="contact-group">
            <p>Email sent to:</p>
            <p className="user-contact">{contact.email || ""}</p>
          </div>
        )}

        <div className="link-text-group">
          <button className="btn-nest ghost" type="button" onClick={onChangeEmail}>
            Change email
          </button>

          <div className="vr"></div>
          {resentPasscode ? (
            <div className="resend-otp-action">
              <SvgSuccess />
              <p>Another code has been sent</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="btn-nest ghost"
              disabled={emailEditMode}
            >
              Resend code
            </button>
          )}
        </div>

        <button
          type="submit"
          className="btn-nest primary"
          disabled={
            code === "" || emailEditMode || errorObject.code !== "" || errorObject.email !== ""
          }
        >
          Verify email
        </button>
        <button type="button" onClick={onRedirect} className={"btn-nest ghost"}>
          Cancel
        </button>
      </form>
    </section>
  );
}
