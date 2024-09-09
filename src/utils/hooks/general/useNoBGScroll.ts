import { useEffect } from "react";

export default function useNoBGScroll(modalOpen: boolean) {
  // Stop page from scrolling while modal is open
  useEffect(() => {
    if (!modalOpen) return;
    document.documentElement.classList.add("no-scroll");
    return () => document.documentElement.classList.remove("no-scroll");
  }, [modalOpen]);
}
