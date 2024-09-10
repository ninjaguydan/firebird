import { useEffect, useState } from "react";

export const PW_ERRORS = [
  {
    label: "isBetween8And255",
    check: /^\S{8,255}$/,
    message: "Contain between 8 and 255 characters (no spaces)",
  },
  {
    label: "hasSpecialCharacter",
    check: /[~!@#$%^&*()_=\[\]{}|;:,.<>/?]+/,
    message: "Contain at least one special character",
  },
  {
    label: "hasNumber",
    check: /\d+/,
    message: "Contain at least one number (0-9)",
  },
  {
    label: "hasUpperCase",
    check: /[A-Z]+/,
    message: "Contain at least one uppercase letter (A-Z)",
  },
  {
    label: "hasLowerCase",
    check: /[a-z]+/,
    message: "Contain at least one lowercase letter (a-z)",
  },
];

export default function useCheckPWRequirements(value: string) {
  const [hasMet, setHasMet] = useState(false);
  useEffect(() => {
    let failedReq = PW_ERRORS.filter((requirement) => !requirement.check.test(value));
    failedReq.length === 0 ? setHasMet(true) : setHasMet(false);
  }, [value]);
  return hasMet;
}
