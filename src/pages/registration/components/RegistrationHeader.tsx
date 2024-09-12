import { IRegistrationSteps } from "src/utils/interfaces/registration/IRegistrationSteps";

type RegistrationHeaderProps = {
  currentStep: keyof IRegistrationSteps;
  onRedirect: () => void;
};

export default function RegistrationHeader({ currentStep, onRedirect }: RegistrationHeaderProps) {
  return (
    <header className="sign-in-header">
      <h2>{currentStep}</h2>
      <button onClick={onRedirect} className="sign-in-btn">
        Already have an account? <span>Sign in</span>
      </button>
    </header>
  );
}
