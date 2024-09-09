import "src/App.css";

import SvgAdd from "assets/icons/SvgAdd.tsx";
import reactLogo from "assets/react.svg";

import viteLogo from "/vite.svg";

function App() {
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

  const requiresAuthentication = !unauthenticatedPaths.includes(location.pathname);

  return (
    <>
      <div>
        <SvgAdd />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
