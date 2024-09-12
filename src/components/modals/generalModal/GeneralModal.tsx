import React from "react";

import "src/components/modals/generalModal/general-modal.css";

import Modal from "src/layout/modal/Modal";

export interface GeneralModalContent {
  header: string;
  message?: string;
  btnLabel?: string;
  actionBtn?: {
    label: string;
    action?: (e: React.MouseEvent) => void;
  };
}

type GeneralModalProps = {
  showModal: boolean;
  closeModal: () => void;
  modalContent: GeneralModalContent;
  className?: string;
};

export default function GeneralModal({
  showModal,
  closeModal,
  modalContent,
  className = "",
}: GeneralModalProps) {
  return (
    <Modal className={`${className}`} closeModal={closeModal} showModal={showModal}>
      <h1>{modalContent.header}</h1>
      {modalContent.message && <p>{modalContent.message}</p>}
      <div className="btn-group">
        <button
          className={`btn-nest ${modalContent.actionBtn ? "secondary" : "primary"}`}
          onClick={closeModal}
        >
          {modalContent.btnLabel || "Close"}
        </button>
        {modalContent.actionBtn && (
          <button onClick={modalContent.actionBtn.action} className="btn-nest primary">
            {modalContent.actionBtn.label}
          </button>
        )}
      </div>
    </Modal>
  );
}
