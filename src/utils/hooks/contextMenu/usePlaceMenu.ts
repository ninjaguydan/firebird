import React, { useEffect, useState } from "react";

export default function usePlaceMenu(
  showMenu: boolean,
  menuRef: React.RefObject<HTMLElement | null>,
  arrowRef: React.RefObject<HTMLDivElement | null>,
  triggerBtnRef: HTMLButtonElement | null,
  closeMenu: () => void,
) {
  const [screenwidth] = useState(window.innerWidth);
  const [scrollPosition] = useState(window.scrollY);

  const placeMenu = (arrow: HTMLDivElement, menu: HTMLElement, button: HTMLButtonElement) => {
    const btnRect = button.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const arrowRect = arrow.getBoundingClientRect();

    const top = btnRect.top - btnRect.height - menuRect.height + 32;
    const left = btnRect.right - menuRect.width / 2 - btnRect.width / 2;

    const offsetRight = menuRect.right - screenwidth;

    arrow.style.top = `${menuRect.bottom + scrollPosition}px`;
    arrow.style.left = `${btnRect.right - btnRect.width / 2}px`;

    menu.style.top = `${top + scrollPosition}px`;
    menu.style.left = `${left}px`;

    if (offsetRight > 0) {
      menu.style.left = `${left - offsetRight - 16}px`;
    }

    if (top < 98) {
      menu.style.top = `${btnRect.bottom + scrollPosition + 16}px`;
      arrow.style.top = `${menuRect.top + scrollPosition - arrowRect.height}px`;
      arrow.style.left = `${btnRect.right - btnRect.width / 2 - 6}px`;
      arrow.style.transform = "rotate(180deg)";
    }
  };

  useEffect(() => {
    if (!showMenu || !menuRef || !triggerBtnRef || !arrowRef) return;
    const arrow = arrowRef.current!;
    const menu = menuRef.current!;
    const button = triggerBtnRef!;
    placeMenu(arrow, menu, button);
  }, [showMenu, menuRef, triggerBtnRef, arrowRef]);

  // if window size changes, or the user scrolls while open, close menu
  useEffect(() => {
    if (screenwidth !== window.innerWidth) closeMenu();
  }, [window.innerWidth]);

  useEffect(() => {
    if (!showMenu) return;

    function forceClose() {
      closeMenu();
    }
    window.addEventListener("scroll", forceClose);
    return () => window.removeEventListener("scroll", forceClose);
  }, [showMenu]);
}
