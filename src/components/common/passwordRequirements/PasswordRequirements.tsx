import React from "react";

import SvgClose from "src/assets/icons/SvgClose";
import SvgSuccess from "src/assets/icons/SvgSuccess";

import "src/components/common/passwordRequirements/password-requirements.css";

import { PW_ERRORS } from "src/utils/hooks/auth/useCheckPWRequirements";

type Props = {
  value: string;
};

export default function PasswordRequirements({ value }: Props) {
  return (
    <div className="pw-check">
      <h3>Password must:</h3>
      {PW_ERRORS.map((criteria) => (
        <p key={criteria.label}>
          {criteria.check.test(value) ? <SvgSuccess fill="#709F38" /> : <SvgClose fill="#C61010" />}
          {criteria.message}
        </p>
      ))}
    </div>
  );
}
