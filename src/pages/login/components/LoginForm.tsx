import React, { FormEvent } from "react";
import { Link, NavLink } from "react-router-dom";

import SvgLock from "assets/icons/SvgLock";
// import SvgPekinLogo from "assets/icons/SvgPekinLogo";
import SvgUser from "assets/icons/SvgUser";

import NestInput from "components/inputs/nestInput/NestInput";
import FullLogo from "src/components/common/fullLogo/FullLogo";

type Props = {
  signIn: (e: FormEvent<HTMLElement>) => void | Promise<void>;
  formValues: { password: string; username: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

export default function LoginForm({ signIn, formValues, handleChange, error }: Props) {
  return (
    <form data-testid="login-form" className="login-card" onSubmit={(e) => signIn(e)}>
      <FullLogo className="login-logo" />
      <h2 className="login-card-title">MyFI sign in</h2>
      <div className="input-group">
        <NestInput
          label="Username"
          value={formValues.username}
          id="username"
          required={false}
          className={error !== "" ? "error" : ""}
          onChange={handleChange}
          labelIcon={<SvgUser />}
        />
        <NestInput
          label="Password"
          value={formValues.password}
          required={false}
          id="password"
          type="password"
          className={error !== "" ? "error" : ""}
          onChange={handleChange}
          labelIcon={<SvgLock />}
        />
        {error !== "" && <p className="error">{error}</p>}
        <Link to={"/forgot-password"} className="forgot-pw-link">
          Forgot password?
        </Link>
      </div>
      <div className="login-card-buttons">
        <button
          className="btn-nest primary"
          disabled={error !== "" || formValues.username === "" || formValues.password === ""}
        >
          Sign In
        </button>
        <p>Don't have an account?</p>
        <NavLink to={"/registration"} className={"btn-nest secondary"}>
          Register Now
        </NavLink>
        <p className="or-row">or</p>
        <Link to={"/guest-payment"} className="btn-nest primary">
          Make One-time Guest Payment
        </Link>
      </div>
    </form>
  );
}
