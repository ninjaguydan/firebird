import { IconButton, Tooltip } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";

import SvgQuestionMark from "assets/icons/SvgQuestionMark";

import NestCheckbox from "src/components/inputs/nestCheckbox/NestCheckbox";

import { floatToCurrency, formatCurrency } from "src/utils/helpers/formatters";
import { IPaymentAmount } from "src/utils/interfaces/data/policyBillingDetails";

type PaymentSelectionProps = {
  cardIndex: number;
  policyIndex: number;
  premium: IPaymentAmount;
  outstanding: IPaymentAmount;
  handlePayment: (index: number, amount: number) => void;
};
export default function BillCardPaymentSelectionLH({
  cardIndex,
  policyIndex,
  premium,
  outstanding,
  handlePayment,
}: PaymentSelectionProps) {
  const otherInput = useRef<HTMLInputElement>(null);
  const loanInput = useRef<HTMLInputElement>(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [tempOtherAmount, setTempOtherAmount] = useState("");
  const [tempLoanAmount, setTempLoanAmount] = useState("");
  const [paymentAmount, setPaymentAmount] = useState({
    [`premium-${cardIndex}-${policyIndex}`]: premium.billedAmount!,
    [`balance-${cardIndex}-${policyIndex}`]: outstanding.billedAmount!,
    [`other-${cardIndex}-${policyIndex}`]: 0,
    [`loan-${cardIndex}-${policyIndex}`]: 0,
  });

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id !== `other-${cardIndex}-${policyIndex}`) {
      setTempOtherAmount("");
      setPaymentAmount({ ...paymentAmount, [`other-${cardIndex}-${policyIndex}`]: 0 });
    }
    if (e.target.id !== `loan-${cardIndex}-${policyIndex}`) {
      setTempLoanAmount("");
      setPaymentAmount({ ...paymentAmount, [`loan-${cardIndex}-${policyIndex}`]: 0 });
    }
    if (e.target.id === selectedPayment) {
      setSelectedPayment("");
      return;
    }
    setSelectedPayment(e.target.id);
  };

  const handleOtherAmount = (e: React.ChangeEvent<HTMLInputElement>, onBlur: boolean = false) => {
    if (outstanding?.billedAmount) {
      if (onBlur && !tempOtherAmount) {
        setTempOtherAmount("");
        return;
      }
      let value = e.target.value;
      const cleanedValue = value.replace(/[^\d.]/g, "");
      const numericValue = parseFloat(cleanedValue);

      if (!isNaN(numericValue) && numericValue > outstanding?.billedAmount) {
        value = outstanding?.billedAmount.toFixed(2);
      }

      if (onBlur && tempOtherAmount) {
        value = numericValue.toFixed(2);
      }

      let formattedValue = formatCurrency(value, onBlur);
      setTempOtherAmount(onBlur ? `$${formattedValue}` : value);
      let formattedNumber = parseFloat(value.replace(",", ""));
      setPaymentAmount({ ...paymentAmount, [`other-${cardIndex}`]: formattedNumber });
      handlePayment(policyIndex, formattedNumber);
    }
  };

  const handleLoanAmount = (e: React.ChangeEvent<HTMLInputElement>, onBlur: boolean = false) => {
    if (outstanding?.billedAmount) {
      if (onBlur && !tempLoanAmount) {
        setTempLoanAmount("");
        return;
      }

      let value = e.target.value;
      const cleanedValue = value.replace(/[^\d.]/g, "");
      const numericValue = parseFloat(cleanedValue);

      if (!isNaN(numericValue) && numericValue > outstanding?.billedAmount) {
        value = outstanding?.billedAmount.toFixed(2);
      }

      if (onBlur && tempOtherAmount) {
        value = numericValue.toFixed(2);
      }

      let formattedValue = formatCurrency(value, onBlur);
      setTempLoanAmount(onBlur ? `$${formattedValue}` : value);
      let formattedNumber = parseFloat(value.replace(",", ""));
      setPaymentAmount({ ...paymentAmount, [`loan-${cardIndex}-${policyIndex}`]: formattedNumber });
      handlePayment(policyIndex, formattedNumber);
    }
  };

  useEffect(() => {
    if (selectedPayment) {
      handlePayment(policyIndex, paymentAmount[selectedPayment]);
    } else {
      handlePayment(policyIndex, 0);
    }
    if (selectedPayment === `other-${cardIndex}-${policyIndex}`) {
      otherInput.current?.focus();
    }
    if (selectedPayment === `loan-${cardIndex}-${policyIndex}`) {
      loanInput.current?.focus();
    }
  }, [selectedPayment]);

  return (
    <div className="payment-col">
      <h3>Payment Selection</h3>
      <div className="payment-selection lh">
        <div
          className={`payment-cell ${selectedPayment === `premium-${cardIndex}-${policyIndex}` ? "selected" : ""}`}
        >
          <NestCheckbox
            label="Premium due"
            id={`premium-${cardIndex}-${policyIndex}`}
            checked={selectedPayment === `premium-${cardIndex}-${policyIndex}`}
            onChange={handleCheckbox}
          />
          <p>{floatToCurrency(premium.billedAmount!)}</p>
        </div>
        <div
          className={`payment-cell ${selectedPayment === `balance-${cardIndex}-${policyIndex}` ? "selected" : ""}`}
        >
          <NestCheckbox
            label="Outstanding balance"
            id={`balance-${cardIndex}-${policyIndex}`}
            checked={selectedPayment === `balance-${cardIndex}-${policyIndex}`}
            onChange={handleCheckbox}
          />
          <p>{floatToCurrency(outstanding.billedAmount!)}</p>
        </div>
        <div
          className={`payment-cell ${selectedPayment === `other-${cardIndex}-${policyIndex}` ? "selected" : ""}`}
        >
          <div className="label-w-tooptip">
            <NestCheckbox
              label="Other amount"
              id={`other-${cardIndex}-${policyIndex}`}
              checked={selectedPayment === `other-${cardIndex}-${policyIndex}`}
              onChange={handleCheckbox}
            />
            <Tooltip
              className="label-tooltip"
              title={
                "If you want to pay an amount different than the min due or outstanding balance, please enter it here in dollars / cents"
              }
            >
              <IconButton>
                <SvgQuestionMark />
              </IconButton>
            </Tooltip>
          </div>
          <input
            ref={otherInput}
            type="text"
            placeholder="$0.00"
            value={tempOtherAmount}
            onChange={handleOtherAmount}
            onBlur={(e) => {
              handleOtherAmount(e, true);
            }}
            disabled={selectedPayment !== `other-${cardIndex}-${policyIndex}`}
            aria-label="Other payment amount"
          />
        </div>
        <div
          className={`payment-cell ${selectedPayment === `loan-${cardIndex}-${policyIndex}` ? "selected" : ""}`}
        >
          <div className="label-w-tooptip">
            <NestCheckbox
              label="Loan amount"
              id={`loan-${cardIndex}-${policyIndex}`}
              checked={selectedPayment === `loan-${cardIndex}-${policyIndex}`}
              onChange={handleCheckbox}
            />
            <Tooltip
              className="label-tooltip"
              title={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nunc enim. Fusce at rutrum ex."
              }
            >
              <IconButton>
                <SvgQuestionMark />
              </IconButton>
            </Tooltip>
          </div>
          <input
            ref={loanInput}
            type="text"
            placeholder="$0.00"
            value={tempLoanAmount}
            onChange={handleLoanAmount}
            onBlur={(e) => {
              handleLoanAmount(e, true);
            }}
            disabled={selectedPayment !== `loan-${cardIndex}-${policyIndex}`}
            aria-label="Loan payment amount"
          />
        </div>
      </div>
    </div>
  );
}
