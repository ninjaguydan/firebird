import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import BillCard from "src/components/cards/billCard/BillCard";

import {
  BACKUP_POLICY_BILL_1,
  BACKUP_POLICY_BILL_2,
  BACKUP_POLICY_BILL_3,
  IPolicyBillingDetail,
} from "src/utils/interfaces/data/policyBillingDetails";

import "./billing.css";

export default function Billing() {
  const bill: IPolicyBillingDetail[] | null = useLocation().state;
  const [displayedBills, setDisplayedBills] = useState<IPolicyBillingDetail[][]>([
    BACKUP_POLICY_BILL_1,
    BACKUP_POLICY_BILL_2,
    BACKUP_POLICY_BILL_3,
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedBill, setSelectedBill] = useState<IPolicyBillingDetail[]>([]);

  useEffect(() => {
    if (bill) {
      setSelectedBill(bill);
    }
  }, [bill]);

  return (
    <>
      <h1 className="page-header">Payments</h1>

      <section className="payments">
        {displayedBills.map((bill, index) => (
          <div className={`tab-content active-${activeTab}`} key={bill[0].accountNumber}>
            <BillCard bill={bill} selectedBill={selectedBill} cardIndex={index} />
          </div>
        ))}
      </section>
    </>
  );
}
