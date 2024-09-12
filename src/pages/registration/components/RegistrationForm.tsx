import React from "react";

import NestInput from "src/components/inputs/nestInput/NestInput";
import NestSelect from "src/components/inputs/nestSelect/NestSelect";

import { IUserObject } from "src/utils/interfaces/registration/IUser";
import { STATE_LIST } from "src/utils/variables/stateList";

type RegistrationFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formValues: IUserObject;
  errors: {
    [key: string]: any;
  };
  disabled: boolean;
  onRedirect: () => void;
};

export default function RegistrationForm({
  handleSubmit,
  handleInputChange,
  formValues,
  errors,
  disabled,
  onRedirect,
}: RegistrationFormProps) {
  return (
    <form onSubmit={handleSubmit} className="nest-form registration-form" name="registration">
      <div className="form-header">
        <p>Enter the policy holder's information</p>
        <p className="required-field">
          <span className="required">*</span> = Required field
        </p>
      </div>
      <div className="inputs">
        <NestInput
          label="Username"
          onChange={handleInputChange}
          value={formValues.username}
          id={"username"}
          autoFocus={true}
          minLength={4}
          maxLength={128}
          error={errors.username}
        />
        <NestInput
          label="First Name"
          onChange={handleInputChange}
          value={formValues.fname}
          id={"fname"}
          error={errors.fname}
        />
        <NestInput
          label="Last Name"
          onChange={handleInputChange}
          value={formValues.lname}
          id={"lname"}
          error={errors.lname}
        />
        <NestInput
          label="Email"
          onChange={handleInputChange}
          value={formValues.email}
          id={"email"}
          type="email"
          error={errors.email}
        />
        <NestInput
          label="Phone number"
          onChange={handleInputChange}
          value={formValues.phone}
          id={"phone"}
          error={errors.phone}
          type="phone"
          className="half"
        />
        <NestInput
          label="Date of birth"
          onChange={handleInputChange}
          value={formValues.dob}
          id={"dob"}
          error={errors.dob}
          type="date"
          className="half "
          max={"9999-01-01"}
        />
        <NestInput
          label="Address"
          onChange={handleInputChange}
          value={formValues.address}
          id={"address"}
          error={errors.address}
        />
        <NestInput
          label="Apartment, suite, ect"
          onChange={handleInputChange}
          value={formValues.apt}
          id={"apt"}
          required={false}
          error={errors.apt}
        />
        <NestInput
          label="City"
          onChange={handleInputChange}
          value={formValues.city}
          id={"city"}
          className="half two-third"
          error={errors.city}
        />
        <NestSelect
          label="State"
          onChange={handleInputChange}
          value={formValues.state}
          id={"state"}
          options={STATE_LIST}
          className="half third"
          error={errors.state}
        />
        <NestInput
          label="Zip"
          onChange={handleInputChange}
          value={formValues.zip}
          id={"zip"}
          className="half mobile-view"
          error={errors.zip}
          maxLength={5}
        />
        <NestInput
          label="Last 4 Social Security #"
          onChange={handleInputChange}
          value={formValues.lastFourSocial}
          id={"lastFourSocial"}
          required={true}
          className="half mobile-view social-input"
          error={errors.lastFourSocial}
          type="password"
          maxLength={4}
        />
      </div>
      <div className="registration-card-buttons">
        <button className="btn-nest primary" disabled={disabled}>
          Save and continue
        </button>
        <button type="button" onClick={onRedirect} className="btn-nest ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
