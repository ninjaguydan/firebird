import { useState } from "react";

import billingLogin from "assets/images/bill-login.png";
import learningLogin from "assets/images/learning-login.png";
import sunbathingLogin from "assets/images/sunbathing-login.png";

import Hero from "layout/hero/Hero";

import LoginForm from "pages/login/LoginForm";
import "pages/login/login.css";

export default function Login() {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value });
  };

  const handleSignIn = () => {};

  return (
    <div id="login-page">
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
