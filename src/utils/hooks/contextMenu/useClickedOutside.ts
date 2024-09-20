import React, { LegacyRef, useEffect } from "react";

export default function useClickedOutside(
  element: React.RefObject<HTMLElement | null>,
  button: HTMLButtonElement | null,
  closeModal: () => void,
  elementVisisble: boolean,
) {
  const clickedOutside = (event: MouseEvent) => {
    const elementDimensions = element!.current!.getBoundingClientRect();
    const btnDimensions = button!.getBoundingClientRect();
    if (
      (event.clientX < elementDimensions.left ||
        event.clientX > elementDimensions.right ||
        event.clientY < elementDimensions.top ||
        event.clientY > elementDimensions.bottom) &&
      (event.clientX < btnDimensions.left ||
        event.clientX > btnDimensions.right ||
        event.clientY < btnDimensions.top ||
        event.clientY > btnDimensions.bottom) &&
      event.clientX !== 0 &&
      event.clientY !== 0
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    if (!element) return;
    document.addEventListener("click", clickedOutside);
    return () => document.removeEventListener("click", clickedOutside);
  }, [elementVisisble, element]);
}
