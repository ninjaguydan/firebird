import React from "react";
import { Link } from "react-router-dom";

import FullLogo from "src/components/buttons/fullLogo/FullLogo";
import NestInput from "src/components/inputs/nestInput/NestInput";

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendCode: (e: React.FormEvent, action: string) => void;
  value: string;
  errorMessage: string;
};

export default function EnterUsernameForm({
  handleChange,
  handleSendCode,
  value,
  errorMessage,
}: Props) {
  return (
    <article className="login-card forgot-password">
      <FullLogo className="login-logo" />
      <h1 className="login-card-title">Password Recovery</h1>
      <p className="description">
        Enter your username to receive a password recovery code. The code will be sent to your
        email.
      </p>
      <form onSubmit={(e) => handleSendCode(e, "sendCode")}>
        <div className="input-group">
          <NestInput
            label="Username"
            value={value}
            id="username"
            required={true}
            onChange={handleChange}
            error={errorMessage}
          />
        </div>
        <div className="login-card-buttons">
          <button
            className="btn-nest primary"
            disabled={value.trim().length === 0 || errorMessage !== ""}
          >
            Send code
          </button>
          <Link to={"/login"} className={"btn-nest ghost"}>
            Cancel
          </Link>
        </div>
      </form>
    </article>
  );
}
