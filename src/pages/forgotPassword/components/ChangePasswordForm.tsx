import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import FullLogo from "src/components/buttons/fullLogo/FullLogo";
import PasswordRequirements from "src/components/common/passwordRequirements/PasswordRequirements";
import ResentCode from "src/components/common/resentCode/ResentCode";
import NestInput from "src/components/inputs/nestInput/NestInput";

interface ErrorMessage {
  recoveryCode: string;
  newPassword: string;
  confirmNewPassword: string;
}
type Props = {
  handleFinish: (e: React.FormEvent) => void;
  recoveryCode: string;
  handleRecoveryCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendCode: (e: React.FormEvent, action: string) => void;
  isCodeSent: boolean;
  password: { newPassword: string; confirmNewPassword: string };
  isValid: boolean;
  errorMessage: ErrorMessage;
};
export default function ChangePasswordForm({
  handleFinish,
  recoveryCode,
  handleRecoveryCodeChange,
  handleChange,
  password,
  handleSendCode,
  isCodeSent,
  isValid,
  errorMessage,
}: Props) {
  return (
    <>
      <article className="login-card forgot-password">
        <FullLogo className="login-logo" />
        <h1 className="login-card-title">Password Recovery</h1>
        <div className="input-group">
          <NestInput
            label="Recovery Code"
            value={recoveryCode}
            id="recoveryCode"
            required={true}
            onChange={handleRecoveryCodeChange}
            error={errorMessage?.recoveryCode}
          />
        </div>
        <p className="description">Choose a new password.</p>
        <PasswordRequirements value={password.newPassword} />
        <form role="form" onSubmit={handleFinish}>
          <div className="input-group">
            <NestInput
              label="Password"
              value={password.newPassword}
              id="newPassword"
              type="password"
              data-testid="new-password"
              onChange={handleChange}
              error={
                errorMessage?.newPassword !== ""
                  ? errorMessage?.newPassword
                  : !isValid && password.newPassword !== ""
                    ? "Criteria not met"
                    : ""
              }
            />
            <NestInput
              label="Confirm Password"
              value={password.confirmNewPassword}
              id="confirmNewPassword"
              type="password"
              data-testid="confirm-password"
              onChange={handleChange}
              error={errorMessage?.confirmNewPassword}
            />
          </div>
          <div className="login-card-buttons">
            {isCodeSent ? (
              <ResentCode />
            ) : (
              <button
                className="btn-nest ghost"
                type="button"
                onClick={(e) => handleSendCode(e, "resendCode")}
              >
                Didn't get an email? Resend.
              </button>
            )}
            <button
              className="btn-nest primary"
              disabled={
                !isValid ||
                password.newPassword !== password.confirmNewPassword ||
                errorMessage.confirmNewPassword !== "" ||
                errorMessage.newPassword !== "" ||
                errorMessage.recoveryCode !== ""
              }
            >
              Finish
            </button>
            <Link to={"/login"} className={"btn-nest ghost"}>
              Cancel
            </Link>
          </div>
        </form>
      </article>
    </>
  );
}
