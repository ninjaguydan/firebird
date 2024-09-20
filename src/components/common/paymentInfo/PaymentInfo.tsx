import moment from "moment";

import React from "react";

import SvgSuccess from "assets/icons/SvgSuccess";

import { floatToCurrency } from "src/utils/helpers/formatters";

import "./payment-info.css";

type PaymentDetailsProps = {
  premium_due: number;
  due_date: string;
};

export default function PaymentInfo({ premium_due, due_date }: PaymentDetailsProps) {
  let hasPaid = premium_due < 1 ? true : false;

  return (
    <div className="payment-details">
      {hasPaid ? (
        <>
          <SvgSuccess />
          <p className="paid">Your policy is paid in full.</p>
        </>
      ) : (
        <>
          <p className="amount-due">{floatToCurrency(premium_due)}</p>
          <p className="due-date">Payment scheduled for {moment(due_date).calendar()}</p>
        </>
      )}
    </div>
  );
}
