import React, { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import SvgSuccess from "src/assets/icons/SvgSuccess";

export default function MFAComplete() {
  const navigate = useNavigate();

  return (
    <section className="mfa-setup complete">
      <SvgSuccess fill="#1b8576" />
      <h1>You&apos;re all set!</h1>
      <p>Make sure to note your authentication methods and keep your passwords secure.</p>
      <button onClick={() => navigate("/login")} className="btn-nest primary">
        Continue to MyFI
      </button>
    </section>
  );
}
