import { Link } from "react-router-dom";

import SvgFacebook from "assets/icons/SvgFacebook";
import SvgInstagram from "assets/icons/SvgInstagram";
import SvgLinkedin from "assets/icons/SvgLinkedin";
import SvgX from "assets/icons/SvgX";
import SvgYoutube from "assets/icons/SvgYoutube";

import FullLogo from "src/components/buttons/fullLogo/FullLogo";

import "src/layout/footer/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="col social">
        <FullLogo />
        <div className="social-icons">
          <a
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.facebook.com/PekinInsurance"}
          >
            <SvgFacebook />
          </a>
          <a
            aria-label="X, formerly Twitter"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://x.com/pekininsurance"}
          >
            <SvgX />
          </a>
          <a
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.instagram.com/pekin_insurance"}
          >
            <SvgInstagram />
          </a>
          <a
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.linkedin.com/company/pekin-insurance"}
          >
            <SvgLinkedin />
          </a>
          <a
            aria-label="Youtube"
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.youtube.com/user/PekinInsurance"}
          >
            <SvgYoutube />
          </a>
        </div>
        <p className="copyright desktop">
          © Firebird Insurance 2099. All rights reserved. | <span> Privacy & Terms</span>
        </p>
      </div>
      <div className="nav-group">
        <nav className="col site-map">
          <h3>Sitemap</h3>
          <div className="link-group">
            <Link to={"/home"}>Overview</Link>
            <div className="vr"></div>
            <Link to={"/mypolicies"}>Policies</Link>
            <div className="vr"></div>
            <Link to={"/payments"}>Billing</Link>
            <div className="vr"></div>
            <Link to={"/setting"}>Settings</Link>
          </div>
        </nav>
        <nav className="col quick-links">
          <h3>Quick links</h3>
          <div className="link-group">
            <a
              href="https://www.pekininsurance.com/find-an-agent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find An Agent
            </a>
            <div className="vr"></div>
            <a
              href="https://www.pekininsurance.com/client-service/customer-center/file-a-claim"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find A Claim
            </a>
            <div className="vr"></div>
            <a
              href="https://webpay.1tech.net/PayMyBill/Account/Login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pay A Bill
            </a>
            <div className="vr"></div>
            <a
              href="https://www.pekininsurance.com/about/company"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </a>
          </div>
        </nav>
        <p className="copyright mobile">
          © Firebird Insurance 2099. All rights reserved. | <span> Privacy & Terms</span>
        </p>
      </div>
    </footer>
  );
}
