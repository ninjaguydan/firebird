import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import SvgDelete from "assets/icons/SvgDelete";
import SvgDots from "assets/icons/SvgDots";
import SvgPolicy from "assets/icons/SvgPolicy";
import SvgEmail from "src/assets/icons/SvgEmail";

import CollapseBtn from "src/components/buttons/collapseBtn/CollapseBtn";

import ContextMenu from "src/layout/contextMenu/ContextMenu";
import Modal from "src/layout/modal/Modal";

import { pluralizeString, toTitleCase } from "src/utils/helpers/formatters";
import { useScreenWidth } from "src/utils/hooks/general/useScreenWidth";
import { IContextMenu } from "src/utils/interfaces/contextMenu/IContextMenu";
import { IPolicyBillingDetail } from "src/utils/interfaces/data/policyBillingDetails";

import HomePolicyCard from "./HomePolicyCard";

type HomeBillCardProps = {
  bill: IPolicyBillingDetail[];
  removeBill: () => void;
};

export default function HomeBillCard({ bill, removeBill }: HomeBillCardProps) {
  const subMenuBtnRef = useRef<HTMLButtonElement>(null);
  const breakpoint = useScreenWidth();
  const [showDetails, setShowDetails] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const account = bill.filter((item) => item.accountNumber === item.policyNumber)[0];
  const policies = bill.filter((item) => item.accountNumber !== item.policyNumber);
  const LOB = account.personalOrCommercial
    ? `${account.personalOrCommercial} Lines`
    : "Life & Health";

  const toggleContextMenu = () => {
    if (showSubmenu === true) {
      closeContextMenu();
    } else {
      setShowSubmenu(true);
      subMenuBtnRef.current?.classList.add("active");
    }
  };

  const closeContextMenu = () => {
    setShowSubmenu(false);
    subMenuBtnRef.current?.classList.remove("active");
    subMenuBtnRef.current?.focus();
  };

  const openWarningModal = () => {
    closeContextMenu();
    setShowDeleteWarning(true);
  };

  const closeWarningModal = () => {
    setShowDeleteWarning(false);
    subMenuBtnRef.current?.focus();
  };

  const handleRemoveBill = () => {
    removeBill();
    setShowDeleteWarning(false);
  };

  const handleContactAgent = () => {
    alert("They're busy...");
    closeContextMenu();
  };

  const contextMenuItems: IContextMenu[] = [
    { icon: <SvgEmail filled />, label: "Contact Agent", action: handleContactAgent },
    { icon: <SvgDelete />, label: "Remove Bill", action: openWarningModal, btnClass: "delete-btn" },
  ];

  return (
    <div className="nest-card account">
      <Modal closeModal={closeWarningModal} showModal={showDeleteWarning}>
        <h1>Remove Account Bill?</h1>
        <p>
          You are about to remove your <span className="date-time-text">{toTitleCase(LOB)}</span>{" "}
          bill for account <span className="date-time-text">#{account.accountNumber}</span> from the
          portal.
        </p>
        <div className="btn-group">
          <button className="btn-nest secondary" onClick={closeWarningModal}>
            Cancel
          </button>
          <button className="btn-nest primary" onClick={handleRemoveBill}>
            Remove
          </button>
        </div>
      </Modal>
      {showSubmenu && (
        <ContextMenu
          showMenu={showSubmenu}
          closeMenu={closeContextMenu}
          items={contextMenuItems}
          triggerBtn={subMenuBtnRef.current}
        />
      )}
      <button
        className={"btn-nest ghost icon-btn policy-submenu-btn"}
        aria-label="bill submenu button"
        aria-haspopup
        onClick={toggleContextMenu}
        ref={subMenuBtnRef}
        type="button"
      >
        <SvgDots />
      </button>
      <header className="account-header">
        <div className="account-header-data">
          <h3>{toTitleCase(LOB)}</h3>
          <p>{`Account #${account.accountNumber}`}</p>
        </div>
      </header>
      <div
        className={breakpoint !== "DESKTOP" ? "btn-nest tertiary" : "collapse-home-desktop"}
        onClick={() => setShowDetails(!showDetails)}
      >
        <SvgPolicy filled className="policy-icon" />
        <CollapseBtn
          isExpanded={showDetails}
          setIsExpanded={setShowDetails}
          labelText={{
            open: "Hide",
            closed: `Show ${policies.length} ${pluralizeString(policies.length, " Policy", "ies")}`,
          }}
        />
      </div>
      {showDetails && (
        <div className="policy-list-home">
          {policies.map((policy) => (
            <HomePolicyCard policy={policy} key={policy.policyNumber} />
          ))}
        </div>
      )}
      <footer className="account-footer">
        <Link state={bill} to={"/payments"} className="btn-nest primary">
          Pay account bill
        </Link>
      </footer>
    </div>
  );
}
