import React, { useState } from "react";

import CollapseBtn from "src/components/buttons/collapseBtn/CollapseBtn";
import Loader from "src/components/loaders/Loader";

import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import BillCardHeader from "./BillCardHeader";
import BillCardPolicyListLH from "./BillCardPolicyListLH";
import BillCardPolicyListPC from "./BillCardPolicyListPC";
import "./styles/bill-card.css";

type BillCardProps = {
  bill: IPolicyBillingDetail[];
  selectedBill: IPolicyBillingDetail[];
  cardIndex: number;
};

export default function BillCard({ bill, cardIndex, selectedBill }: BillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShowErrorModal, setShowErrorModal] = useState(false);
  const [showErrorSubMsg, setErrorSubMsg] = useState("");
  const [showErrorType, setShowErrorType] = useState("");
  const [loadingStep, setLoadingStep] = useState(false);
  const [showPaymentSummaryModal, setShowPaymentSummaryModal] = useState(false);
  let paymentAmounts: { minDue?: number; balance?: number; reinstate?: number } = {};
  const account = bill.filter((item) => item.accountNumber === item.policyNumber)[0];
  const policies = bill.filter((item) => item.accountNumber !== item.policyNumber);
  // const homeOwnersPayment = bill.filter((policy) => policy.policyType === "Homeowners")[0];
  const totalPaidAmountForHomeOwners = bill
    .filter((policy) => policy.policyType === "Homeowners")
    .reduce((sum, policy) => {
      const amount = policy?.paidAmount;
      return sum + (typeof amount === "number" && !isNaN(amount) ? amount : 0);
    }, 0);
  // const personalAutoPayment = bill.filter((policy) => policy.policyType === "Personal Auto")[0];
  const totalPaidAmountForAuto = bill
    .filter((policy) => policy.policyType === "Personal Auto")
    .reduce((sum, policy) => {
      const amount = policy?.paidAmount;
      return sum + (typeof amount === "number" && !isNaN(amount) ? amount : 0);
    }, 0);
  // const businessOwnersPayment = bill.filter((policy) => policy.policyType === "Business Owners")[0];
  const totalPaidAmountForBusinessOwners = bill
    .filter((policy) => policy.policyType === "Business Owners")
    .reduce((sum, policy) => {
      const amount = policy?.paidAmount;
      return sum + (typeof amount === "number" && !isNaN(amount) ? amount : 0);
    }, 0);
  // const termLifePayment = bill.filter((policy) => policy.policyType === "Term Life")[0];
  const totalPaidAmountForTermLife = bill
    .filter((policy) => policy.policyType === "Term Life")
    .reduce((sum, policy) => {
      const amount = policy?.paidAmount;
      return sum + (typeof amount === "number" && !isNaN(amount) ? amount : 0);
    }, 0);
  // const medicareSupplimentPayment = bill.filter((policy) => policy.policyType === "Medicare Supplement")[0];
  const totalPaidAmountForMedicareSuppliment = bill
    .filter((policy) => policy.policyType === "Medicare Supplement")
    .reduce((sum, policy) => {
      const amount = policy?.paidAmount;
      return sum + (typeof amount === "number" && !isNaN(amount) ? amount : 0);
    }, 0);
  // const wholeLifePayment = bill.filter((policy) => policy.policyType === "Whole Life")[0];
  const totalPaidAmountForWholeLife = bill
    .filter((policy) => policy.policyType === "Whole Life")
    .reduce((sum, policy) => {
      const amount = policy?.paidAmount;
      return sum + (typeof amount === "number" && !isNaN(amount) ? amount : 0);
    }, 0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(`min-due-${cardIndex}`);
  const [paymentAmount, setPaymentAmount] = useState({
    [`min-due-${cardIndex}`]: paymentAmounts.minDue!,
    [`balance-${cardIndex}`]: paymentAmounts.balance!,
    [`reinstate-${cardIndex}`]: paymentAmounts.reinstate,
    [`other-${cardIndex}`]: 0,
  });

  // TODO: find a better way to do this
  account.paymentAmounts?.forEach((amount) => {
    if (amount.amountLabel === "Minimum Amount Due") {
      paymentAmounts.minDue = amount.billedAmount;
      return;
    }
    if (amount.amountLabel === "Total Amount Due") {
      paymentAmounts.balance = amount.billedAmount;
      return;
    }
    if (amount.amountLabel === "Reinstatement Amount") {
      paymentAmounts.reinstate = amount.billedAmount;
      return;
    }
    return;
  });

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorSubMsg("");
  };

  const closeModal = () => setShowPaymentSummaryModal(false);

  const handleNext = () => {
    closeModal();
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
      window.alert(`You did it. You're debt free.`);
    }, 1000);
  };

  return (
    <div className="account-card-payments">
      {loadingStep && <Loader />}

      {/* <PaymentSummaryModal
        showModal={showPaymentSummaryModal}
        handleNext={handleNext}
        closeModal={closeModal}
        totalPaidAmount={
          account.personalOrCommercial ? paymentAmount[selectedPayment] : totalPayment
        }
        insuredName={account?.insuredName}
        accountNumber={account?.accountNumber}
        minimumDue={paymentAmount?.minDue || null}
        homeownersPayment={
          account.personalOrCommercial === "personal" && totalPaidAmountForHomeOwners > 0
            ? totalPaidAmountForHomeOwners
            : null
        }
        personalAutoPayment={
          account.personalOrCommercial === "personal" && totalPaidAmountForAuto > 0
            ? totalPaidAmountForAuto
            : null
        }
        businessOwnersPayment={
          account.personalOrCommercial === "commercial" && totalPaidAmountForBusinessOwners > 0
            ? totalPaidAmountForBusinessOwners
            : null
        }
        termLifePayment={
          account.personalOrCommercial === null && totalPaidAmountForTermLife > 0
            ? totalPaidAmountForTermLife
            : null
        }
        medicareSupplimentPayment={
          account.personalOrCommercial === null && totalPaidAmountForMedicareSuppliment > 0
            ? totalPaidAmountForMedicareSuppliment
            : null
        }
        wholeLifePayment={
          account.personalOrCommercial === null && totalPaidAmountForWholeLife > 0
            ? totalPaidAmountForWholeLife
            : null
        }
      /> */}
      <BillCardHeader account={account} />
      <CollapseBtn
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        labelText={{ open: "Hide", closed: "Show billing details" }}
        className="policy-detail-toggle"
      />
      {(isExpanded || selectedBill[0]?.accountNumber === account?.accountNumber) && (
        <>
          {account.personalOrCommercial ? (
            <BillCardPolicyListPC
              cardIndex={cardIndex}
              policies={policies}
              accountPayments={paymentAmounts}
              setShowPaymentSummaryModal={setShowPaymentSummaryModal}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              paymentAmount={paymentAmount}
              setPaymentAmount={setPaymentAmount}
            />
          ) : (
            <BillCardPolicyListLH
              cardIndex={cardIndex}
              policies={policies}
              setShowPaymentSummaryModal={setShowPaymentSummaryModal}
              totalPayment={totalPayment}
              setTotalPayment={setTotalPayment}
            />
          )}
        </>
      )}
    </div>
  );
}
