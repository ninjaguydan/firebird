import React, { useState } from "react";
import { Link } from "react-router-dom";

import BackBtn from "src/components/buttons/backBtn/BackBtn";
import BillCard from "src/components/cards/billCard/BillCard";
import FullLogo from "src/components/common/fullLogo/FullLogo";
import GeneralModal, { GeneralModalContent } from "src/components/modals/generalModal/GeneralModal";

import { useScreenWidth } from "src/utils/hooks/general/useScreenWidth";
import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

type GuestPaymentBillProps = {
  foundBill: IPolicyBillingDetail[];
  back: (...args: any) => void;
};

export default function GuestPaymentBill({ foundBill, back }: GuestPaymentBillProps) {
  const [showWarning, setShowWarning] = useState(false);
  const breakpoint = useScreenWidth();

  const handleBack = () => {
    setShowWarning(false);
    back();
  };

  const warningContent: GeneralModalContent = {
    header: "Are you sure?",
    btnLabel: "Continue",
    message:
      "Exiting now will cause you to lose all progress up to this point. To make a one time guest payment, you will have to conduct a new search for your policies.",
    actionBtn: { label: "Exit guest payment", action: handleBack },
  };

  return (
    <div className="login-card" id="guest-payment-details">
      <GeneralModal
        showModal={showWarning}
        closeModal={() => setShowWarning(false)}
        modalContent={warningContent}
      />
      <FullLogo className="login-logo" />
      <div>
        <p className="guest-payment-subtitle">
          If you have any problem during the process, please give us a call at
          <Link to={"tel:+8003220160"}> (800) 322-0160</Link> or contact your agent.
        </p>
      </div>
      <BillCard bill={foundBill} selectedBill={foundBill} cardIndex={0} />
      <BackBtn
        action={() => setShowWarning(true)}
        className={breakpoint === "MOBILE" ? "btn-nest secondary" : undefined}
      />
    </div>
  );
}
