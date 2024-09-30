import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import billingLogin from "assets/images/bill-login.png";
import learningLogin from "assets/images/learning-login.png";
import sunbathingLogin from "assets/images/sunbathing-login.png";

import LoginForm from "pages/login/components/LoginForm";
import Loader from "src/components/loaders/generalLoader/Loader";

import Hero from "layout/hero/Hero";

import "pages/login/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loadingStep, setLoadingStep] = useState(false);
  const [formValues, setFormValues] = useState({ username: "heisenberg08", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value });
  };

  const handleSignIn = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoadingStep(true);
    authenticateUser();
  };

  const authenticateUser = () => {
    setTimeout(() => {
      navigate("/verify");
      setLoadingStep(false);
    }, 1000);
  };

  return (
    <div id="login-page">
      {loadingStep && <Loader />}
      <Hero />
      <section className="login-actions">
        <LoginForm
          signIn={handleSignIn}
          formValues={formValues}
          handleChange={handleInputChange}
          error={error}
        />

        <article className="login-info">
          <div className="info-box">
            <img src={billingLogin} alt="" />
            <p>Manage your bills</p>
          </div>
          <div className="info-box">
            <img src={learningLogin} alt="" />
            <p>Know your policies</p>
          </div>
          <div className="info-box">
            <img src={sunbathingLogin} alt="" />
            <p>Have peace of mind</p>
          </div>
        </article>
      </section>
    </div>
  );
}
