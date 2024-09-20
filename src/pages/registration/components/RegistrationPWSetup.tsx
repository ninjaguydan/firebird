import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";

import PasswordRequirements from "src/components/common/passwordRequirements/PasswordRequirements";
import NestInput from "src/components/inputs/nestInput/NestInput";
import Loader from "src/components/loaders/Loader";
import "src/pages/registration/components/registration-pw-setup.css";

import useValidator from "src/utils/hooks/registration/useValidator";
import { ContactInfo } from "src/utils/interfaces/registration/IContactInfo";
import { MFA } from "src/utils/interfaces/registration/IRegistrationSteps";
import { passwordValidator } from "src/utils/validators/passwordValidator";

import { StepContext } from "../Registration";

const EMPTY = { pw: "", confirm: "" };

type PasswordSetupProps = {
  contact: ContactInfo;
  setContact: React.Dispatch<SetStateAction<ContactInfo>>;
  onRedirect: () => void;
};

export default function RegistrationPWSetup({ contact, onRedirect }: PasswordSetupProps) {
  const [passwords, setPasswords] = useState(EMPTY);
  const [loadingStep, setLoadingStep] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: contact?.username,
    firstName: (contact?.name).split(" ")[0],
    lastName: (contact?.name).split(" ")[1],
    email: contact?.email,
    phone: contact?.phone,
  });

  const [error, setError] = useState("");
  const errors = useValidator(passwords, EMPTY, passwordValidator);
  const [errorObject, setErrorObject] = useState({
    email: "",
    password: "",
  });
  const cantContinue =
    errors.pw ||
    errors.confirm ||
    !passwords.pw ||
    !passwords.confirm ||
    errorObject.email ||
    errorObject.password;
  const setCurrentStep = useContext(StepContext)!;

  useEffect(() => {
    editButtonRef?.current?.focus();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setErrorObject((errorObject) => ({
      ...errorObject,
      password: "",
    }));
    setPasswords({ ...passwords, [event.target.id]: event.target.value });
    inputFieldRef?.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoadingStep(true);

    setTimeout(() => {
      setLoadingStep(false);
      setCurrentStep(MFA);
    }, 1000);
  };

  return (
    <section className="pw-setup">
      {loadingStep && <Loader />}

      <div className="form-header">
        <p>Please look over your contact info and choose a password.</p>
        <p className="required-field">
          <span className="required">*</span> = Required field
        </p>
      </div>
      <div className="password-setup-fields">
        <div className="info-group">
          <p>
            <span>Username:</span> {contact.username}
          </p>
          <p>
            <span>Name:</span> {contact.name}
          </p>
          <p>
            <span>Phone:</span> {contact.phone}
          </p>
          <p>
            <span>Email:</span> {updatedUserInfo?.email}
          </p>
        </div>
      </div>
      <div className="password-setup-sub-heading">Choose a password</div>
      <form onSubmit={handleSubmit} className="password-setup-fields">
        <NestInput
          label="Password"
          onChange={handleInputChange}
          value={passwords.pw}
          required={true}
          type="password"
          id={"pw"}
          error={errors.pw}
        />
        {errorObject?.password !== "" && (
          <span className="error-message">{errorObject?.password}</span>
        )}
        <PasswordRequirements value={passwords.pw} />
        <NestInput
          label="Confirm Password"
          onChange={handleInputChange}
          value={passwords.confirm}
          required={true}
          type="password"
          id={"confirm"}
          error={errors.confirm}
        />
        <div className="registration-card-buttons">
          <button
            className="btn-nest primary"
            disabled={cantContinue || error !== "" || isEditable}
            autoFocus={cantContinue || error !== "" || isEditable ? false : true}
          >
            Save and continue
          </button>
          <button type="button" onClick={onRedirect} className={"btn-nest ghost"}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
