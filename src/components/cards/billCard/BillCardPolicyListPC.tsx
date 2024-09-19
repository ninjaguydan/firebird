import React, { SetStateAction } from "react";

import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import BillCardPaymentSelectionPC from "./BillCardPaymentSelectionPC";
import BillCardPolicyPC from "./BillCardPolicyPC";

type BillPolicyListPCProps = {
  cardIndex: number;
  policies: IPolicyBillingDetail[];
  accountPayments: { minDue?: number; balance?: number; reinstate?: number };
  setShowPaymentSummaryModal: React.Dispatch<SetStateAction<boolean>>;
  selectedPayment: string;
  setSelectedPayment: React.Dispatch<SetStateAction<string>>;
  paymentAmount: { [x: string]: number | undefined };
  setPaymentAmount: React.Dispatch<SetStateAction<{ [x: string]: number | undefined }>>;
};

export const setLabel = (value: string) => {
  if (value === "Total Amount Due") return "Outstanding balance";
  if (value === "Minimum Amount Due") return "Minimum due";
  if (value === "Reinstatement Amount") return "Reinstatement";
  return value;
};

export default function BillCardPolicyListPC({
  cardIndex,
  policies,
  accountPayments,
  setShowPaymentSummaryModal,
  selectedPayment,
  setSelectedPayment,
  paymentAmount,
  setPaymentAmount,
}: BillPolicyListPCProps) {
  return (
    <div className="bill-policy-list pc">
      {accountPayments.reinstate && (
        <p className="bold warning">
          Unfortunately, we have not received your payment and, as a result, your policies will be
          cancelled. This policies will no longer provide insurance coverage. We value you as a
          customer and want to continue as your insurance provider. In order to keep your policy in
          force, please pay the *Reinstatement amount.
        </p>
      )}
      <h3>Product Information</h3>
      <div className="bill-policy-details">
        {policies.map((policy, i) => (
          <React.Fragment key={policy.policyNumber}>
            <BillCardPolicyPC policy={policy} cardIndex={cardIndex} />
            {i !== policies.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
      <h3>Payment Selection</h3>
      <BillCardPaymentSelectionPC
        cardIndex={cardIndex}
        paymentAmounts={accountPayments}
        setShowPaymentSummaryModal={setShowPaymentSummaryModal}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
      />
    </div>
  );
}
