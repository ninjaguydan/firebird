import React, { useEffect, useState } from "react";

import SvgError from "src/assets/icons/SvgError";

import "src/components/modals/errorModal/error-modal.css";

import Modal from "src/layout/modal/Modal";

type ErrorModalProps = {
  showModal: boolean;
  closeModal: () => void;
  errorMessage?: string;
};

const ErrorModal = ({ showModal, closeModal, errorMessage = "" }: ErrorModalProps) => {
  return (
    <Modal showModal={showModal} closeModal={closeModal} className="error-modal">
      <header className="content">
        <SvgError fill={"#C61010"} />
        {errorMessage !== "" ? (
          <p>{errorMessage}</p>
        ) : (
          <p>
            If this error persists, call our help desk at{" "}
            <a className="telnum" href="tel:800-322-0160">
              800-322-0160
            </a>{" "}
            Ext. 2757
          </p>
        )}
      </header>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default ErrorModal;
