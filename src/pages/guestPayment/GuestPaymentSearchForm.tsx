import React, { SetStateAction, useRef, useState } from "react";
import { Link } from "react-router-dom";

import FullLogo from "src/components/common/fullLogo/FullLogo";
import NestInput from "src/components/inputs/nestInput/NestInput";
import NestSelect from "src/components/inputs/nestSelect/NestSelect";
import Loader from "src/components/loaders/Loader";
import PolicyListModal from "src/components/modals/policyListModal/PolicyListModal";

import { forceNumber, forcePolicyFormat } from "src/utils/helpers/formatters";
import {
  BACKUP_POLICY_BILL_1,
  IPolicyBillingDetail,
} from "src/utils/interfaces/data/policyBillingDetails";
import { validatePolicyNumber, validateZip } from "src/utils/validators/validators";

type FormProps = {
  setPolicySearch: React.Dispatch<SetStateAction<boolean>>;
  setFoundBill: React.Dispatch<SetStateAction<IPolicyBillingDetail[] | undefined>>;
};

export default function GuestPaymentSearchForm({ setPolicySearch, setFoundBill }: FormProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({
    isLifePolicy: false,
    policyOrAccountNumber: "",
    zipCode: "",
  });
  const [policyType, setPolicyType] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorObject, setErrorObject] = useState({
    policyNumber: "",
    zipCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.id === "policyOrAccountNumber") {
      setFormData({ ...formData, [e.target.id]: forcePolicyFormat(e.target.value).toUpperCase() });
      setErrorObject((errorObject) => ({
        ...errorObject,
        policyNumber: validatePolicyNumber(e.target.value),
      }));
      return;
    }
    if (e.target.id === "zipCode") {
      setFormData({ ...formData, [e.target.id]: forceNumber(e.target.value) });
      setErrorObject((errorObject) => ({
        ...errorObject,
        zipCode: validateZip(e.target.value),
      }));
      return;
    }
    setPolicyType(e.target.value);
    if (e.target.value === "Life & Health") {
      setFormData({ ...formData, isLifePolicy: true });
    } else {
      setFormData({ ...formData, isLifePolicy: false });
    }
  };

  const onContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    searchPolicies();
  };

  // search for policies logic
  const searchPolicies = () => {
    setTimeout(() => {
      setIsSearching(false);
      setPolicySearch(false);
      setFoundBill(BACKUP_POLICY_BILL_1);
    }, 2000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    btnRef.current?.focus();
  };

  return (
    <form className="login-card" onSubmit={onContinue}>
      {isSearching && <Loader />}
      <FullLogo className="login-logo" />
      <div>
        <h2 className="login-card-title">Please provide us with the policy information below.</h2>
        <p className="guest-payment-subtitle">
          Adding an account bill will automatically display all policies tied to that account,
          whether it is one policy or multiple (e.g. Home & Auto). If you have any problem during
          the process, please give us a call at
          <Link to={"tel:+8003220160"}> (601) 502-5179</Link> or contact your agent.
        </p>
      </div>
      <div className="policy-selection">
        <NestSelect
          label="Policy type"
          id="policy-type"
          options={["Personal & Commercial", "Life & Health"]}
          value={policyType}
          onChange={handleChange}
        />
        <button
          type="button"
          ref={btnRef}
          className="btn-nest tertiary"
          disabled={!policyType}
          onClick={() => setShowModal(true)}
        >
          List of policies
        </button>
        <PolicyListModal
          showModal={showModal}
          closeModal={handleModalClose}
          isLifePolicy={formData.isLifePolicy}
        />
      </div>
      <hr />
      <NestInput
        label="Policy / Account Number"
        id="policyOrAccountNumber"
        value={formData.policyOrAccountNumber}
        onChange={handleChange}
        error={errorObject.policyNumber}
        maxLength={20}
      />
      <NestInput
        label="Zip Code"
        id="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        error={errorObject.zipCode}
        maxLength={5}
      />
      <div className="footer-group">
        <p className="required-field">
          <span className="required">*</span> = Required field
        </p>
        <div className="btn-group">
          <Link to={"/login"} className="btn-nest secondary">
            Cancel
          </Link>
          <button
            className="btn-nest primary"
            disabled={
              !policyType ||
              !formData.policyOrAccountNumber ||
              !formData.zipCode ||
              errorObject.policyNumber !== "" ||
              errorObject.zipCode !== ""
            }
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}
