import moment from "moment";

import React from "react";

import { floatToCurrency } from "src/utils/helpers/formatters";
import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import { setLabel } from "./BillCardPolicyListPC";

type BillPolicyRowProps = {
  policy: IPolicyBillingDetail;
  cardIndex: number;
};
export default function BillCardPolicyPC({ policy, cardIndex }: BillPolicyRowProps) {
  return (
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
      {policy.paymentAmounts?.map((amount) => (
        <div className="detail-row" key={`${cardIndex}-${amount.amountLabel}`}>
          <p className="detail-header">{setLabel(amount.amountLabel!)}</p>
          <p className="detail-data">{floatToCurrency(amount.billedAmount!)}</p>
        </div>
      ))}
    </div>
  );
}
