import { useEffect } from "react";

export default function useTrapFocus(modalRef: any, modalOpen: boolean) {
  useEffect(() => {
    if (!modalOpen) return;
    if (modalRef) {
      const focusableElements = modalRef.current.querySelectorAll(
        "a[href], button:not(:disabled), textarea, input, select",
      );
      const firstElement = focusableElements[0];
      firstElement.focus();
    }
  }, [modalOpen]);
}
