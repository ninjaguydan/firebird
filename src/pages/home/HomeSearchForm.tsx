import React, { useRef, useState } from "react";

import SvgInfo from "assets/icons/SvgInfo";
import SvgPolicySearch from "assets/icons/SvgPolicySearch";

import NestInput from "src/components/inputs/nestInput/NestInput";
import NestSelect from "src/components/inputs/nestSelect/NestSelect";
import Loader from "src/components/loaders/generalLoader/Loader";
import PolicyListModal from "src/components/modals/policyListModal/PolicyListModal";

import { forceNumber, forcePolicyFormat } from "src/utils/helpers/formatters";
import { validatePolicyNumber, validateZip } from "src/utils/validators/validators";

type PolicyFormProps = {
  onCancel: () => void;
  hasPolicies: boolean;
};

export default function HomeSearchForm({ onCancel, hasPolicies }: PolicyFormProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    searchPolicies();
  };

  const handleModalClose = () => {
    setShowModal(false);
    btnRef.current?.focus();
  };

  // search for policies logic
  const searchPolicies = () => {
    setTimeout(() => {
      setIsSearching(false);
      onCancel();
    }, 2000);
  };

  return (
    <form className="add-policy-form nest-card" onSubmit={handleSubmit}>
      {isSearching && <Loader />}
      <SvgPolicySearch className="policy-search" />
      <div>
        <p>
          To add your policies, please choose your policy type, enter your policy number + zip code,
          or account number + zip code.
        </p>
        <div className="settings-info">
          <SvgInfo />
          <small>
            Adding an account will automatically display all policies tied to that account, whether
            it is one policy or multiple (e.g. Home & Auto)
          </small>
        </div>
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

      <div className="input-group">
        <NestInput
          label={`Policy or account #`}
          id="policyOrAccountNumber"
          value={formData.policyOrAccountNumber}
          onChange={handleChange}
          error={errorObject.policyNumber}
          maxLength={20}
        />
        <NestInput
          label="Zip code"
          id="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          error={errorObject.zipCode}
          maxLength={5}
        />
      </div>
      <div className="btn-group">
        {hasPolicies && (
          <button className="btn-nest secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
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
          Search
        </button>
      </div>
    </form>
  );
}
