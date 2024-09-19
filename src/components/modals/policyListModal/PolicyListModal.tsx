import React from "react";

import LineOfBusinessIcon from "src/components/common/lineOfBusinessIcon/LineOfBusinessIcon";
import "src/components/modals/policyListModal/policy-list-modal.css";

import Modal from "src/layout/modal/Modal";

type ModalProps = {
  closeModal: () => void;
  showModal: boolean;
  isLifePolicy: boolean;
};
type PolicyList = { header: string; products: string[] }[];

const PC: PolicyList = [
  {
    header: "Personal",
    products: ["Auto", "Cycle", "RV", "Home", "Dwelling Fire", "Umbrella", "Inland Marine", "Boat"],
  },
  {
    header: "Commercial",
    products: [
      "Commercial Lines",
      "Business Owners",
      "Workman's Comp",
      "Umbrella",
      "Business Auto",
    ],
  },
];
const LH: PolicyList = [
  {
    header: "Life",
    products: [
      "Term Life",
      "Universal Life",
      "Whole Life",
      "Full Circle",
      "Medicare Supplement",
      "Preferred",
      "Disability Income",
      "Annuity",
    ],
  },
  { header: "Group", products: ["Life", "Dental", "Short-term Disability"] },
  { header: "Voluntary Products", products: ["Life", "Short-term Disability", "Accident"] },
  { header: "Financial Products", products: ["Mortgage Insurance"] },
];

export default function PolicyListModal({ closeModal, showModal, isLifePolicy }: ModalProps) {
  const policyList = isLifePolicy ? LH : PC;
  const listTypeClass = isLifePolicy ? "pc" : "lh";

  return (
    <Modal closeModal={closeModal} showModal={showModal} className="policy-list">
      <Modal.Close />
      <h1>{isLifePolicy ? "Life & Health" : "Personal & Commercial"}</h1>
      <div className={`policy-list-grid ${listTypeClass}`}>
        {policyList.map((section, index) => (
          <div key={section.header} className={`list-${index}`}>
            <h2>
              <LineOfBusinessIcon type={section.header} />
              {section.header}
            </h2>
            <ul>
              {section.products.map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="btn-nest primary" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
}
