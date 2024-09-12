import { useState } from "react";
import { Route, Routes } from "react-router";

import Footer from "layout/footer/Footer";
import Header from "layout/header/Header";

import MFA from "./pages/mfa/MFA";
import ForgotPassword from "pages/forgotPassword/ForgotPassword";
import Login from "pages/login/LogIn";
import Registration from "pages/registration/Registration";

import useSesionManagement from "utils/hooks/auth/useSessionManagement";
import useScrollToTop from "utils/hooks/general/useScrollToTop";

import viteLogo from "/vite.svg";

const unauthenticatedPaths = [
  "/",
  "/login",
  "/login-redirect",
  "/registration",
  "/forgot-password",
  "/signin",
  "/check-email",
  "/verify",
  "/setu-pmfa",
  "/notFound",
  "/one-time-payment",
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const requiresAuthentication = !unauthenticatedPaths.includes(location.pathname);
  useSesionManagement(isLoggedIn);
  useScrollToTop();

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);
  const mainStyle = () => (unauthenticatedPaths.includes(location.pathname) ? "external" : "");

  return (
    <>
      {requiresAuthentication && <Header logOut={logOut} />}
      <main className={mainStyle()}>
        <Routes>
          <Route path="/" element={<Login logIn={logIn} />} />
          <Route path="/login" element={<Login logIn={logIn} />} />
          <Route path="forgot-password" Component={ForgotPassword} />
          <Route path="/registration" Component={Registration} />
          <Route path="verify" Component={MFA} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
