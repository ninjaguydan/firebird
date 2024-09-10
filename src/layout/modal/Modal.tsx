/*

This Modal component is a reusable, standalone module for building A11Y compliant 
modals in the application. The module handles trapping focus (so that tabbing outside
of the madal is impossible until it is closed) and closing with the ESC key. It also 
makes it impossible to scroll/ interact with the background while it is open.

To use, simply import it and wrap your modal's content with the component.

------
import Modal from "/layout/Modal/index.tsx"

<Modal>
  <header>Modal Title</header>
  <div>Modal content goes here...</div>
</Modal>
------

To function propoperly, Modal expects a function for closing itself. Likely, it will be a 
useState setter function that control's the modal's visibility. 

------
useState [showModal, setShowModal] = useState(false)

<Modal closeModal={() => setShowModal(false) }>
  <header>Modal Title</header>
  <div>Modal content goes here...</div>
</Modal>
------

By default, the modal is styled to match the basic Cards of myPI, but any
styles may be overwritten via the optional 'classList' prop.

The Modal includes an optional Close button. To use, simply include <Modal.Close /> in your <Modal> wrapper

*/
import React, { createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";

import SvgClose from "src/assets/icons/SvgClose";

import "src/layout/modal/modal.css";

import useNoBGScroll from "src/utils/hooks/general/useNoBGScroll";
import useKeyListener from "src/utils/hooks/modal/useKeyListener";
import useTrapFocus from "src/utils/hooks/modal/useTrapFocus";

const ModalContext = createContext({
  closeModal: () => {},
});

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
  showModal: boolean;
  className?: string;
};

export default function Modal({ children, closeModal, showModal, className = "" }: ModalProps) {
  const modalRef = useRef<HTMLElement>();
  useNoBGScroll(showModal);
  useKeyListener(modalRef, closeModal, showModal);
  useTrapFocus(modalRef, showModal);

  return createPortal(
    <>
      {showModal && (
        <div className="modal-overlay" aria-modal="true">
          <figure
            className={`generic-modal ${className}`}
            ref={modalRef as React.LegacyRef<HTMLElement> | undefined}
          >
            <ModalContext.Provider value={{ closeModal }}>{children}</ModalContext.Provider>
          </figure>
        </div>
      )}
    </>,
    document.body,
  );
}

Modal.Close = function ModalClose() {
  const { closeModal } = useContext(ModalContext);
  return (
    <button className="modal-close icon-btn ghost" onClick={closeModal} aria-label="Close">
      <SvgClose fill="#1b8576" />
    </button>
  );
};
