export interface IRegistrationSteps {
  "Personal Info": string;
  "Email Verification": string;
  "Password Setup": string;
  "MFA Setup": string;
  Complete: string;
}

export const PERSONAL_INFO = "Personal Info";
export const VERIFICATION = "Email Verification";
export const PASSWORD_SETUP = "Password Setup";
export const MFA = "MFA Setup";
export const COMPLETE = "Complete";
export const STEPS: (keyof IRegistrationSteps)[] = [
  PERSONAL_INFO,
  VERIFICATION,
  PASSWORD_SETUP,
  MFA,
  COMPLETE,
];
