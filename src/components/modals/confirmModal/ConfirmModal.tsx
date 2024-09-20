import React from "react";

import Modal from "src/layout/modal/Modal";

import "./confirm-modal.css";
import { ConfirmModalContent } from "./modalContent";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content: ConfirmModalContent;
};

export default function ConfirmModal({ isOpen, onClose, onConfirm, content }: ConfirmModalProps) {
  return (
    <Modal showModal={isOpen} closeModal={onClose} className="confirm-modal">
      <header>
        <content.Icon />
        <h1>{content.header}</h1>
      </header>
      <p>{content.message}</p>
      <div className="btn-group">
        <button onClick={onClose} title="Close">
          {content.closeText}
        </button>
        <div className="vr"></div>
        <button onClick={onConfirm} title="Confirm">
          {content.confirmText}
        </button>
      </div>
    </Modal>
  );
}
