import React from "react";
import { Link } from "react-router-dom";

import SvgBill from "assets/icons/SvgBill";
import SvgLink from "assets/icons/SvgLink";
import SvgQuestionMark from "assets/icons/SvgQuestionMark";
import SvgSupport from "assets/icons/SvgSupport";

import "./quick-links.css";

type QuickToolsProps = {
  breakpoint: "MOBILE" | "TABLET" | "DESKTOP";
};

export default function QuickLinks({ breakpoint }: QuickToolsProps) {
  return (
    <div className="quick-tools agency-card-group">
      <header className="section-header">
        <SvgLink />
        <h2>Quick Links</h2>
      </header>
      <div className="quick-tools-btn-group home nest-card">
        {breakpoint === "MOBILE" && (
          <>
            <Link to={"tel:+8003220160"}>
              <SvgSupport />
              Help Center: <span className="time">800 - 322 - 0160</span>
            </Link>
            <div className="seperator" />
          </>
        )}
        <Link to={""}>
          <SvgBill filled />
          <p>Make a one time payment</p>
        </Link>
        <div className="seperator" />
        <Link to={"/help"}>
          <SvgQuestionMark />
          <p>Frequently Asked Questions</p>
        </Link>
      </div>
    </div>
  );
}
