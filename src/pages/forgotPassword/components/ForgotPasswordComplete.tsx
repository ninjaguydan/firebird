import React from "react";
import { useNavigate } from "react-router";

import SvgSuccess from "src/assets/icons/SvgSuccess";

import FullLogo from "src/components/buttons/fullLogo/FullLogo";

export default function ForgotPasswordComplete() {
  const navigate = useNavigate();
  return (
    <article className="login-card forgot-password">
      <FullLogo className="login-logo" />
      <div className="forgot-password-success">
        <SvgSuccess />
        <h1 className="login-card-title">Password successfully changed.</h1>
        <p className="description">
          Make sure to note your authentication methods & keep your password secure. You will be
          redirected to login.
        </p>
        <button className="btn-nest primary" onClick={() => navigate("/login")}>
          Ok
        </button>
      </div>
    </article>
  );
}
