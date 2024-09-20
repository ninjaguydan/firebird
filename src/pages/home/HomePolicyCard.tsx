import React from "react";
import { Link } from "react-router-dom";

import SvgDots from "assets/icons/SvgDots";

import PaymentInfo from "src/components/common/paymentInfo/PaymentInfo";
import PolicyIcon from "src/components/common/policyIcon/PolicyIcon";

import { floatToCurrency } from "src/utils/helpers/formatters";
import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

type PolicyCardProps = {
  policy: IPolicyBillingDetail;
};

export default function HomePolicyCard({ policy }: PolicyCardProps) {
  const autoPay = policy.policyStatus === "Active" ? "ON" : "OFF";
  const status = policy.policyStatus === "Active" ? "green" : "red";
  const outstanding = policy.paymentAmounts?.filter(
    (amount) => amount.amountLabel === "Total Amount Due",
  )[0];
  const minimum = policy.paymentAmounts?.filter(
    (amount) => amount.amountLabel === "Minimum Amount Due",
  )[0];

  return (
    <article key={policy.policyNumber} className="policy-card nest-card alt">
      <div className="policy-cols">
        <div className="policy-col">
          <h4 className="card-header alt">
            <PolicyIcon category={policy.policyType!} />
            {policy.policyType}
          </h4>
          <div className="policy-card-details">
            <p className="bold">
              Policy: <span>#{policy.policyNumber}</span>
            </p>
            <p>
              Agency: <span>Eagle Insurance LLC #12654</span>
            </p>
            <p>
              Insured: <span>{policy.insuredName}</span>
            </p>
            <p className={status}>
              Policy Status: <span className="bold">{policy.policyStatus}</span>
            </p>
            <p className={`${autoPay === "ON" ? "green" : "red"}`}>
              Autopay: <span className="bold">{autoPay}</span>
            </p>
            <p>
              {outstanding?.amountLabel}: <span>{floatToCurrency(outstanding?.billedAmount!)}</span>
            </p>
          </div>
        </div>
        <div className="vr"></div>
        <div className="policy-col ">
          <h5 className="col-header">Payment due:</h5>
          <PaymentInfo premium_due={outstanding?.billedAmount!} due_date={policy.policyDueDate!} />
          <div className="policy-card-details">
            <p>
              Premium paid: <span>{floatToCurrency(0)}</span>
            </p>
            <p>
              Remaining Premium: <span>{floatToCurrency(outstanding?.billedAmount! - 0)}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
