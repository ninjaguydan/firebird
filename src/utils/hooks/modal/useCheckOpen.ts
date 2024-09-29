import { useEffect } from "react";

export default function useCheckOpen(isOpen: boolean) {
  const checkOpen = () => {
    const modal = document.getElementById("sticky-modal");

    if (!modal) return;

    if (isOpen) {
      modal.classList.add("open");
    } else {
      modal.classList.remove("open");
    }
  };

  useEffect(() => {
    checkOpen();
  }, [isOpen]);
}
