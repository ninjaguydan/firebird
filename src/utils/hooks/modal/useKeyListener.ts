import { useEffect } from "react";

import handleTabKey from "src/utils/helpers/handleTabKey";

export default function useKeyListener(modalRef: any, closeModal: () => void, modalOpen: boolean) {
  const keyListenerMap = new Map([
    [27, closeModal],
    [9, handleTabKey],
  ]);

  useEffect(() => {
    if (!modalOpen) return;
    function keyListener(e: any) {
      const listener = keyListenerMap.get(e.keyCode);
      return listener && listener(e, modalRef);
    }
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [modalOpen]);
}
