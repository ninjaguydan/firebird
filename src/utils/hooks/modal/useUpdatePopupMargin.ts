import { useEffect } from "react";

export default function useUpdatePopupMargin(isOpen: boolean) {
  const updatePopupMargin = () => {
    const modalStyle = document.getElementById("sticky-modal")?.style;
    if (!modalStyle) return;
    if (isOpen) {
      modalStyle.top = `20rem`;
      modalStyle.transitionDuration = "0s";
    } else {
      modalStyle.transitionDuration = "0.5s";
      modalStyle.top = `7rem`;
    }
  };

  const handleMobileResize = () => {
    const mobileBreakpoint = 767;
    const tabletBreakpoint = 1023;
    const desktopBreakpoint = 1206;
    const header = document.getElementById("main-header");
    const modal = document.getElementById("sticky-modal");

    if (header && modal) {
      if (window.innerWidth <= mobileBreakpoint) {
        updatePopupMargin();
      } else if (mobileBreakpoint < window.innerWidth && window.innerWidth <= tabletBreakpoint) {
        header.removeEventListener("click", updatePopupMargin);
        modal.style.top = `7rem`;
        modal.style.transitionDuration = "0rem";
      } else if (tabletBreakpoint < window.innerWidth && window.innerWidth <= desktopBreakpoint) {
        header.removeEventListener("click", updatePopupMargin);
        modal.style.top = `7rem`;
        modal.style.transitionDuration = "0rem";
      } else if (desktopBreakpoint < window.innerWidth && window.innerWidth <= 1800) {
        header.removeEventListener("click", updatePopupMargin);
        modal.style.top = "7rem";
        modal.style.transitionDuration = "0rem";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleMobileResize);
    handleMobileResize();
    return () => {
      window.removeEventListener("resize", handleMobileResize);
      const header = document.getElementById("main-header");
      header && header.removeEventListener("click", updatePopupMargin);
    };
  }, [isOpen]);
}
