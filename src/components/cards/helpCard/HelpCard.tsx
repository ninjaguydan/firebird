import React from "react";
import { Link } from "react-router-dom";

import SvgAgencyInfo from "assets/icons/SvgAgencyInfo";
import SvgSupport from "assets/icons/SvgSupport";

import "./help-center.css";

export default function HelpCard() {
  return (
    <div className="agency-card-group">
      <header className="section-header">
        <SvgSupport />
        <h2>Need help?</h2>
      </header>
      <div className="help-center nest-card">
        <h3>Help Center</h3>
        <p>
          Our Help Center is available to solve any issues you may encounter within the portal. For
          policy detail questions, please reach out to your agent.
        </p>
        <Link to={"tel:+8003220160"}>
          Help Center Line: <span>601 - 502 - 5179</span>
        </Link>
      </div>
    </div>
  );
}
