import React, { useState } from "react";

import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import HomeBillCard from "./HomeBillCard";

type AccountCardProps = {
  bills: IPolicyBillingDetail[][];
};

export default function HomeBillList({ bills }: AccountCardProps) {
  const removeBill = () => {
    alert("you did it. you removed the thing.");
  };

  return (
    <div className="account-card-list">
      {bills.map((bill) => (
        <HomeBillCard bill={bill} key={bill[0].accountNumber} removeBill={removeBill} />
      ))}
    </div>
  );
}
