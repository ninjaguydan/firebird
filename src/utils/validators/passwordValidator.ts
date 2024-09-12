import { PW_ERRORS } from "../hooks/auth/useCheckPWRequirements";

export function passwordValidator(formObject: { pw: string; confirm: string }) {
  const errors = {
    pw: "",
    confirm: "",
  };
  const pw = formObject.pw;
  const confirm = formObject.confirm;
  if (pw) {
    const criteriaMet = PW_ERRORS.every((error) => error.check.test(pw));
    errors.pw = criteriaMet ? "" : "Criteria not met";

    if (confirm && pw !== confirm) {
      errors.confirm = "Passwords do not match";
    }
  }
  return errors;
}
