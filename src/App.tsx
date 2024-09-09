import { useState } from "react";
import { Route, Routes } from "react-router";

import Footer from "layout/footer/Footer";
import Header from "layout/header/Header";

import Login from "pages/login/LogIn";

import ScrollToTop from "utils/hooks/general/useScrollToTop";

import viteLogo from "/vite.svg";

const unauthenticatedPaths = [
  "/",
  "/login",
  "/loginredirect",
  "/registration",
  "/forgotpassword",
  "/signin",
  "/checkemail",
  "/verify",
  "/setupmfa",
  "/notFound",
  "/one-time-payment",
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const requiresAuthentication = !unauthenticatedPaths.includes(location.pathname);

  const logOut = () => setIsLoggedIn(false);
  const mainStyle = () => (unauthenticatedPaths.includes(location.pathname) ? "external" : "");

  return (
    <>
      {requiresAuthentication && <Header logOut={logOut} />}
      <ScrollToTop />
      <main className={mainStyle()}>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/login" Component={Login} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
