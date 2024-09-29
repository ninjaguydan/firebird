import { RefObject, useEffect, useState } from "react";

export default function useCheckActive(
  homeRef: RefObject<HTMLAnchorElement>,
  billingRef: RefObject<HTMLAnchorElement>,

  settingsRef: RefObject<HTMLAnchorElement>,
) {
  const [activeStates, setActiveStates] = useState({
    home: false,
    billing: false,
    policy: false,
    settings: false,
  });

  const checkActive = () => {
    if (homeRef.current!.classList.contains("active")) {
      setActiveStates({ ...activeStates, home: true });
      return;
    } else {
      setActiveStates({ ...activeStates, home: false });
    }
    if (billingRef.current!.classList.contains("active")) {
      setActiveStates({ ...activeStates, billing: true });
      return;
    } else {
      setActiveStates({ ...activeStates, billing: false });
    }

    if (settingsRef.current!.classList.contains("active")) {
      setActiveStates({ ...activeStates, settings: true });
      return;
    } else {
      setActiveStates({ ...activeStates, settings: false });
    }
  };

  useEffect(() => {
    checkActive();
    if (homeRef && billingRef && settingsRef) {
      document.addEventListener("click", checkActive);
    }
    return () => document.removeEventListener("click", checkActive);
  }, []);

  return activeStates;
}
