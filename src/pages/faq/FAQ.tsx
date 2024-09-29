import React from "react";

import SvgInfo from "assets/icons/SvgInfo";
import SvgPhone from "assets/icons/SvgPhone";
import SvgQuestionMark from "assets/icons/SvgQuestionMark";

import "./FAQ.css";
import HelpSelections from "./FAQSelections";

export default function FAQ() {
  return (
    <>
      <h1 className="page-header">
        <SvgQuestionMark /> Frequently Asked Questions
      </h1>

      <HelpSelections />

      <section className="section faq bottom">
        <header className="section-header">
          <SvgInfo />
          <h2> Other resources</h2>
        </header>
        <div className="quick-tools-btn-group nest-card">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <SvgQuestionMark />
            FAQ
          </a>
          <div className="seperator" />
          <a href="#" target="_blank" rel="noopener noreferrer">
            <SvgPhone filled />
            Contact Us
          </a>
        </div>
        <p>
          Clicking these links will open them in a new tab of your browser. Once finished, you may
          close the extra tab, you will not be signed out of MyFI.
        </p>
      </section>
    </>
  );
}
