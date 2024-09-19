import React, { useState } from "react";

import creditCard from "assets/images/credit-card.png";
import PC from "assets/images/pc.png";
import registration from "assets/images/registration.png";
import otpBackground from "assets/images/women-meeting.png";

import Hero from "src/layout/hero/Hero";

import "src/pages/guestPayment/guest-payment.css";

import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import GuestPaymentBill from "./GuestPaymentBill";
import GuestPaymentSearchForm from "./GuestPaymentSearchForm";

export default function GuestPayment() {
  const IMAGE = <img src={otpBackground} alt="two women in business meeting" className="hero-bg" />;
  const [policySearchForm, setPolicySearchForm] = useState(true);
  const [foundBill, setFoundBill] = useState<IPolicyBillingDetail[] | undefined>();

  return (
    <div id="otp-page">
      <Hero subheader="One-Time Guest Payment" img={IMAGE} />
      <section className="login-actions">
        {foundBill ? (
          <GuestPaymentBill foundBill={foundBill} back={() => setFoundBill(undefined)} />
        ) : (
          <GuestPaymentSearchForm
            setPolicySearch={setPolicySearchForm}
            setFoundBill={setFoundBill}
          />
        )}

        <article className="login-info">
          <div className="info-box">
            <img src={PC} alt="" />
            <p>Pay your bill online</p>
          </div>
          <div className="info-box">
            <img src={creditCard} alt="" />
            <p>Use a credit card or bank account</p>
          </div>
          <div className="info-box">
            <img src={registration} alt="" />
            <p>No registration necessary</p>
          </div>
        </article>
      </section>
    </div>
  );
}
