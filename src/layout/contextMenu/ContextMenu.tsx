import React, { LegacyRef, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";

import useClickedOutside from "src/utils/hooks/contextMenu/useClickedOutside";
import usePlaceMenu from "src/utils/hooks/contextMenu/usePlaceMenu";
import useKeyListener from "src/utils/hooks/modal/useKeyListener";
import useTrapFocus from "src/utils/hooks/modal/useTrapFocus";
import { IContextMenu } from "src/utils/interfaces/contextMenu/IContextMenu";

import "./context-menu.css";

type ContextMenuProps = {
  showMenu: boolean;
  closeMenu: () => void;
  items: IContextMenu[]; // Items prop must have a length greater than 0 or fatal error will occur
  triggerBtn: HTMLButtonElement | null;
  className?: string;
};

export default function ContextMenu({
  showMenu,
  closeMenu,
  items,
  triggerBtn,
  className = "",
}: ContextMenuProps) {
  const menuRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  usePlaceMenu(showMenu, menuRef, arrowRef, triggerBtn, closeMenu);
  useTrapFocus(menuRef, showMenu);
  useClickedOutside(menuRef, triggerBtn, closeMenu, showMenu);
  useKeyListener(menuRef, closeMenu, showMenu);

  return createPortal(
    <>
      {showMenu && (
        <>
          <nav className={`context-menu ${className}`} ref={menuRef} aria-modal>
            {items.map((item, index) => (
              <button
                className={`context-menu-btn ${item.btnClass || ""}`}
                onClick={() => item.action()}
                key={`context-item-${index}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
          <div className="arrow" ref={arrowRef}></div>
        </>
      )}
    </>,
    document.body,
  );
}
