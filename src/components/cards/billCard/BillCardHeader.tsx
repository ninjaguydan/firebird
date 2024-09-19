import moment from "moment";

import React, { useState } from "react";

import SvgShieldAccount from "assets/icons/SvgShieldAccount";

import { floatToCurrency, toTitleCase } from "src/utils/helpers/formatters";
import { setLabel } from "src/utils/helpers/setLabel";
import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

type BillCardHeaderProps = {
  account: IPolicyBillingDetail;
};

export default function BillCardHeader({ account }: BillCardHeaderProps) {
  const LOB = account.personalOrCommercial
    ? `${account.personalOrCommercial} Lines`
    : "Life & Health";

  //TODO: find a better way to do this when the data comes in.
  const reinstatement = account.paymentAmounts?.filter(
    (amount) => amount.amountLabel === "Reinstatement Amount",
  )[0];
  const minimum = account.paymentAmounts?.filter(
    (amount) => amount.amountLabel === "Minimum Amount Due",
  )[0];
  const outstanding = account.paymentAmounts?.filter(
    (amount) => amount.amountLabel === "Total Amount Due",
  )[0];

  return (
    <div className="payment-account-header">
      <h2>
        <SvgShieldAccount /> {toTitleCase(LOB)}
      </h2>

      <div className="account-details">
        <div className="detail-row">
          <p className="detail-header">Name</p>
          <p className="detail-data">{account.insuredName}</p>
        </div>
        <div className="detail-row">
          <p className="detail-header">Account #</p>
          <p className="detail-data">{account.accountNumber}</p>
        </div>
        {reinstatement ? (
          <div className="detail-row">
            <p className="detail-header warning">Last date to pay</p>
            <p className="detail-data">{moment(account.lastDateToPay).calendar()}</p>
          </div>
        ) : (
          <div className="detail-row">
            <p className="detail-header">Due Date</p>
            <p className="detail-data">{moment(account.policyDueDate).calendar()}</p>
          </div>
        )}
        {reinstatement ? (
          <div className="detail-row">
            <p className="detail-header warning">{setLabel(reinstatement.amountLabel!)}</p>
            <p className="detail-data">{floatToCurrency(reinstatement.billedAmount!)}</p>
          </div>
        ) : (
          <div className="detail-row">
            <p className="detail-header">{setLabel(minimum?.amountLabel!)}</p>
            <p className="detail-data">{floatToCurrency(minimum?.billedAmount!)}</p>
          </div>
        )}
        <div className="detail-row">
          <p className="detail-header">{setLabel(outstanding?.amountLabel!)}</p>
          <p className="detail-data">{floatToCurrency(outstanding?.billedAmount!)}</p>
        </div>
      </div>
    </div>
  );
}
