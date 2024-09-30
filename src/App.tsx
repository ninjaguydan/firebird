import { useState } from "react";
import { Route, Routes } from "react-router";

import Footer from "layout/footer/Footer";
import Header from "layout/header/Header";

import Billing from "./pages/billing/Billing";
import FAQ from "./pages/faq/FAQ";
import MFA from "./pages/mfa/MFA";
import Settings from "./pages/settings/Settings";
import ForgotPassword from "pages/forgotPassword/ForgotPassword";
import GuestPayment from "pages/guestPayment/GuestPayment";
import Home from "pages/home/Home";
import Login from "pages/login/LogIn";
import Registration from "pages/registration/Registration";

import useSesionManagement from "utils/hooks/auth/useSessionManagement";
import useScrollToTop from "utils/hooks/general/useScrollToTop";

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
  "/guest-payment",
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useSesionManagement(isLoggedIn);
  useScrollToTop();

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);
  const mainStyle = () => (!isLoggedIn ? "external" : "");

  return (
    <>
      {isLoggedIn && <Header logOut={logOut} />}
      <main className={mainStyle()}>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/login" Component={Login} />
          <Route path="forgot-password" Component={ForgotPassword} />
          <Route path="/registration" Component={Registration} />
          <Route path="/verify" element={<MFA logIn={logIn} />} />
          <Route path="/guest-payment" Component={GuestPayment} />
          <Route path="/home" Component={Home} />
          <Route path="/billing" Component={Billing} />
          <Route path="/settings" element={<Settings logOut={logOut} />} />
          <Route path="/help" Component={FAQ} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
