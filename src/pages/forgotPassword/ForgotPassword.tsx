import { useEffect, useState } from "react";

import Loader from "src/components/loaders/Loader";
import ChangePasswordForm from "src/pages/forgotPassword/components/ChangePasswordForm";
import EnterUsernameForm from "src/pages/forgotPassword/components/EnterUsernameForm";
import ForgotPasswordComplete from "src/pages/forgotPassword/components/ForgotPasswordComplete";

import Hero from "src/layout/hero/Hero";

import useCheckPWRequirements from "src/utils/hooks/auth/useCheckPWRequirements";

export default function ForgotPassword() {
  const [loadingStep, setLoadingStep] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [error, setError] = useState({
    username: "",
    recoveryCode: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [recoveryCode, setRecoveryCode] = useState("");
  const [step, setStep] = useState<"STEP1" | "STEP2" | "STEP3">("STEP1");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const newPasswordIsValid = useCheckPWRequirements(password.newPassword);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleRecoveryCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoveryCode(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedPassword = { ...password, [id]: value };

    let newPasswordError = "";
    let confirmNewPasswordError = "";

    if (id === "confirmNewPassword") {
      if (updatedPassword.newPassword && value && updatedPassword.newPassword !== value) {
        confirmNewPasswordError = "Passwords do not match!";
      }
    } else if (id === "newPassword") {
      if (
        updatedPassword.confirmNewPassword &&
        value &&
        updatedPassword.confirmNewPassword !== value
      ) {
        confirmNewPasswordError = "Passwords do not match!";
      }
    }

    setPassword(updatedPassword);
    setError({
      ...error,
      confirmNewPassword: confirmNewPasswordError,
      newPassword: newPasswordError,
    });
  };

  const handleSendCode = (e: React.FormEvent, action: string) => {
    e.preventDefault();
    if (action === "resendCode") {
      setIsCodeSent(true);
      return;
    }

    setLoadingStep(true);

    setTimeout(() => {
      setLoadingStep(false);
      setStep("STEP2");
    }, 3000);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStep(true);
    handleRecoverPassword();
  };

  const handleRecoverPassword = () => {
    setTimeout(() => {
      setLoadingStep(false);
      setRecoveryCode("");
      setPassword({ ...password, newPassword: "", confirmNewPassword: "" });
      setStep("STEP3");
    }, 3000);
  };

  useEffect(() => {
    if (isCodeSent) {
      const timeoutId = setTimeout(() => {
        setIsCodeSent(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCodeSent]);

  return (
    <div id="login-page">
      <Hero />
      <section className="login-actions">
        {loadingStep && <Loader />}

        {step === "STEP1" && (
          <EnterUsernameForm
            value={username}
            handleChange={handleUsernameChange}
            handleSendCode={handleSendCode}
            errorMessage={error.username}
          />
        )}
        {step === "STEP2" && (
          <ChangePasswordForm
            handleFinish={handleFinish}
            recoveryCode={recoveryCode}
            handleRecoveryCodeChange={handleRecoveryCodeChange}
            password={password}
            isCodeSent={isCodeSent}
            handleSendCode={handleSendCode}
            handleChange={handlePasswordChange}
            isValid={newPasswordIsValid}
            errorMessage={error}
          />
        )}
        {step === "STEP3" && <ForgotPasswordComplete />}
      </section>
    </div>
  );
}
