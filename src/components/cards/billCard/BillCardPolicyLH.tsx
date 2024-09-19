import moment from "moment";

import React from "react";

import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import BillCardPaymentSelectionLH from "./BillCardPaymentselectionLH";

type PolicyRowProps = {
  policy: IPolicyBillingDetail;
  cardIndex: number;
  policyIndex: number;
  handlePayment: (index: number, amount: number) => void;
};

export default function BillCardPolicyLH({
  policy,
  cardIndex,
  policyIndex,
  handlePayment,
}: PolicyRowProps) {
  const premium = policy.paymentAmounts?.filter(
    (amount) => amount.amountLabel === "Premium Payment",
  )[0];
  const outstanding = policy.paymentAmounts?.filter(
    (amount) => amount.amountLabel === "Total Amount Due",
  )[0];

  return (
    <div className="bill-policy-row">
      <div className="payment-col">
        <h3>Product Information</h3>
        <div className="bill-policy">
          <div className="detail-row">
            <p className="detail-header">Product</p>
            <p className="detail-data">{policy.policyType}</p>
          </div>
          <div className="detail-row">
            <p className="detail-header">Policy #</p>
            <p className="detail-data">{policy.policyNumber}</p>
          </div>
          <div className="detail-row">
            <p className="detail-header">Insured</p>
            <p className="detail-data">{policy.insuredName}</p>
          </div>
          <div className="detail-row">
            <p className="detail-header">Due date</p>
            <p className="detail-data">{moment(policy.policyDueDate).calendar()}</p>
          </div>
        </div>
      </div>
      <BillCardPaymentSelectionLH
        cardIndex={cardIndex}
        policyIndex={policyIndex}
        premium={premium!}
        outstanding={outstanding!}
        handlePayment={handlePayment}
      />
    </div>
  );
}
