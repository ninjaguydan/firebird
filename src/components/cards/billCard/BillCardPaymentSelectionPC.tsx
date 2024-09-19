import { IconButton, Tooltip } from "@mui/material";

import React, { SetStateAction, useEffect, useRef, useState } from "react";

import SvgQuestionMark from "assets/icons/SvgQuestionMark";

import NestCheckbox from "src/components/inputs/nestCheckbox/NestCheckbox";

import { floatToCurrency, formatCurrency } from "src/utils/helpers/formatters";

type BillPaymentSelectionProps = {
  paymentAmounts: { minDue?: number; balance?: number; reinstate?: number };
  cardIndex: number;
  setShowPaymentSummaryModal: React.Dispatch<SetStateAction<boolean>>;
  selectedPayment: string;
  setSelectedPayment: React.Dispatch<SetStateAction<string>>;
  paymentAmount: { [x: string]: number | undefined };
  setPaymentAmount: React.Dispatch<SetStateAction<{ [x: string]: number | undefined }>>;
};

export default function BillCardPaymentSelectionPC({
  cardIndex,
  paymentAmounts,
  setShowPaymentSummaryModal,
  selectedPayment,
  setSelectedPayment,
  paymentAmount,
  setPaymentAmount,
}: BillPaymentSelectionProps) {
  const input = useRef<HTMLInputElement>(null);
  const [tempOtherAmount, setTempOtherAmount] = useState("");
  const [showPaymentNote, setShowPaymentNote] = useState(false);

  useEffect(() => {
    const { minDue, balance, reinstate } = paymentAmounts;

    if (balance) {
      const updatedPaymentAmount: any = {
        [`balance-${cardIndex}`]: balance,
      };

      if (minDue) {
        updatedPaymentAmount[`min-due-${cardIndex}`] = minDue;
      }

      if (reinstate) {
        updatedPaymentAmount[`reinstate-${cardIndex}`] = reinstate;
      }

      setPaymentAmount((prev) => ({
        ...prev,
        ...updatedPaymentAmount,
      }));
    }
  }, [cardIndex]);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id !== `other-${cardIndex}`) {
      setTempOtherAmount("");
      setPaymentAmount({ ...paymentAmount, [`other-${cardIndex}`]: 0 });
    }
    setShowPaymentNote(false);
    setSelectedPayment(e.target.id);
  };

  const handleOtherAmount = (e: React.ChangeEvent<HTMLInputElement>, onBlur: boolean = false) => {
    if (paymentAmounts?.balance) {
      if (onBlur && !tempOtherAmount) {
        setTempOtherAmount("");
        return;
      }
      let value = e.target.value;
      const cleanedValue = value.replace(/[^\d.]/g, "");
      const numericValue = parseFloat(cleanedValue);
      if (numericValue > 0) setShowPaymentNote(false);
      if (!isNaN(numericValue) && numericValue > 99999.99) {
        value = "99999.99";
      }

      if (onBlur && tempOtherAmount) {
        value = numericValue.toFixed(2);
      }
      let formattedValue = formatCurrency(value, onBlur);
      setTempOtherAmount(onBlur ? `$${formattedValue}` : value);
      let formattedNumber = parseFloat(value.replace(",", ""));
      setPaymentAmount({ ...paymentAmount, [`other-${cardIndex}`]: formattedNumber });
    }
  };

  useEffect(() => {
    if (paymentAmounts.reinstate) {
      setSelectedPayment(`reinstate-${cardIndex}`);
    }
  }, []);

  useEffect(() => {
    if (selectedPayment === `other-${cardIndex}`) {
      input.current?.focus();
    }
  }, [selectedPayment]);

  const handleMakePayment = () => {
    if (paymentAmount[selectedPayment] === 0) return setShowPaymentNote(true);
    setShowPaymentSummaryModal(true);
  };

  return (
    <>
      <div className="payment-selection">
        {paymentAmounts.reinstate ? (
          <div className={`payment-cell selected warning`}>
            <NestCheckbox
              label="Reinstatement"
              id={`reinstate-${cardIndex}`}
              checked={true}
              onChange={() => {}}
              disabled={true}
            />
            <p>{floatToCurrency(paymentAmount[`reinstate-${cardIndex}`]!)}</p>
          </div>
        ) : (
          <div
            className={`payment-cell ${selectedPayment === `min-due-${cardIndex}` ? "selected" : ""}`}
          >
            <NestCheckbox
              label="Minimum due"
              id={`min-due-${cardIndex}`}
              checked={selectedPayment === `min-due-${cardIndex}`}
              onChange={handleCheckbox}
            />
            <p>{floatToCurrency(paymentAmount[`min-due-${cardIndex}`]!)}</p>
          </div>
        )}
        <div
          className={`payment-cell ${selectedPayment === `balance-${cardIndex}` ? "selected" : ""}`}
        >
          <NestCheckbox
            label="Outstanding balance"
            id={`balance-${cardIndex}`}
            checked={selectedPayment === `balance-${cardIndex}`}
            onChange={handleCheckbox}
            disabled={!!paymentAmounts.reinstate}
          />
          <p>{floatToCurrency(paymentAmount[`balance-${cardIndex}`]!)}</p>
        </div>
        <div
          className={`payment-cell ${selectedPayment === `other-${cardIndex}` ? "selected" : ""}`}
        >
          <div className="label-w-tooptip">
            <NestCheckbox
              label="Other amount"
              id={`other-${cardIndex}`}
              checked={selectedPayment === `other-${cardIndex}`}
              onChange={handleCheckbox}
              disabled={!!paymentAmounts.reinstate}
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
            ref={input}
            type="text"
            placeholder="$0.00"
            value={tempOtherAmount}
            onChange={handleOtherAmount}
            onBlur={(e) => handleOtherAmount(e, true)}
            disabled={selectedPayment !== `other-${cardIndex}`}
            aria-label="Other payment amount"
          />
        </div>
        <div className="payment-cell total">
          <label
            htmlFor="total"
            className={
              paymentAmount[selectedPayment] === 0 || Number.isNaN(paymentAmount[selectedPayment])
                ? "zeo-value"
                : "non-zero-value"
            }
          >
            Total payment
          </label>
          <p
            className={
              paymentAmount[selectedPayment] === 0 || Number.isNaN(paymentAmount[selectedPayment])
                ? "zeo-value"
                : "non-zero-value"
            }
          >
            {floatToCurrency(paymentAmount[selectedPayment]!)}
          </p>
        </div>
        <div className="payment-cell">
          <button className="btn-nest primary" onClick={handleMakePayment}>
            Make Payment
          </button>
        </div>
      </div>
      {showPaymentNote && (
        <div className="total-payment-amount-notice">
          <p>
            Payment amount must be greater than {floatToCurrency(paymentAmount[selectedPayment]!)}
          </p>
        </div>
      )}
    </>
  );
}
