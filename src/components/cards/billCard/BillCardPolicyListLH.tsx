import moment from "moment";

import React, { SetStateAction, useState } from "react";

import { floatToCurrency } from "src/utils/helpers/formatters";
import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import BillCardPolicyLH from "./BillCardPolicyLH";

type BillPolicyListLHProps = {
  cardIndex: number;
  policies: IPolicyBillingDetail[];
  setShowPaymentSummaryModal: React.Dispatch<SetStateAction<boolean>>;
  totalPayment: number;
  setTotalPayment: React.Dispatch<SetStateAction<number>>;
};

export default function BillCardPolicyListLH({
  cardIndex,
  policies,
  setShowPaymentSummaryModal,
  totalPayment,
  setTotalPayment,
}: BillPolicyListLHProps) {
  const [payments, setPayments] = useState<{ amount: number }[]>(
    new Array(policies.length).fill({ amount: 0 }),
  );
  const [showPaymentNote, setShowPaymentNote] = useState(false);

  const handlePayment = (index: number, amount = 0) => {
    let tempPayments = payments.map((payment, i) => {
      if (i === index) {
        return { amount: amount };
      } else return payment;
    });
    setPayments(tempPayments);
    calcTotal(tempPayments);
  };

  const handleMakePayment = () => {
    if (totalPayment === 0) return setShowPaymentNote(true);
    setShowPaymentSummaryModal(true);
  };

  const calcTotal = (payments: { amount: number }[]) => {
    let total = 0;
    payments.forEach((payment) => {
      if (payment.amount) {
        total += payment.amount;
      }
    });
    if (total > 0) setShowPaymentNote(false);
    setTotalPayment(total);
  };

  return (
    <div className="bill-policy-list lh">
      <div className="bill-policy-details">
        {policies.map((policy, idx) => (
          <React.Fragment key={policy.policyNumber}>
            <BillCardPolicyLH
              policy={policy}
              cardIndex={cardIndex}
              policyIndex={idx}
              handlePayment={handlePayment}
            />
            {idx !== policies.length - 1 && <hr />}
          </React.Fragment>
        ))}
        <div className="lh-total-payment">
          <div className="detail-row">
            <p className="detail-header">Payment Date</p>
            <p className="detail-data">{moment().format("MM/D/YYYY")}</p>
          </div>
          <div
            className={
              totalPayment === 0 || Number.isNaN(totalPayment)
                ? "detail-row total zero-value"
                : "detail-row total non-zero-value"
            }
          >
            <p
              className={
                totalPayment === 0 || Number.isNaN(totalPayment)
                  ? "detail-header zero-value"
                  : "detail-header non-zero-value"
              }
            >
              Total Payment
            </p>
            <p
              className={
                totalPayment === 0 || Number.isNaN(totalPayment)
                  ? "detail-data zero-value"
                  : "detail-data non-zero-value"
              }
            >
              {floatToCurrency(totalPayment)}
            </p>
          </div>
          <div className="payment-cell">
            <button className="btn-nest primary" onClick={handleMakePayment}>
              Make Payment
            </button>
          </div>
        </div>
        {showPaymentNote && (
          <div className="total-payment-amount-notice lh">
            <p>Payment amount must be greater than {floatToCurrency(totalPayment!)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
