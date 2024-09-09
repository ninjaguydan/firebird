import { RefObject, useEffect, useState } from "react";

export default function useCheckActive(
  homeRef: RefObject<HTMLAnchorElement>,
  billingRef: RefObject<HTMLAnchorElement>,
  policyRef: RefObject<HTMLAnchorElement>,
  settingsRef: RefObject<HTMLAnchorElement>,
) {
  const [activeStates, setActiveStates] = useState({
    home: false,
    billing: false,
    policy: false,
    settings: false,
  });

  useEffect(() => {
    if (homeRef) {
      if (homeRef.current!.classList.contains("active")) {
        setActiveStates({ ...activeStates, home: true });
        return;
      } else {
        setActiveStates({ ...activeStates, home: false });
      }
    }
    if (billingRef) {
      if (billingRef.current!.classList.contains("active")) {
        setActiveStates({ ...activeStates, billing: true });
        return;
      } else {
        setActiveStates({ ...activeStates, billing: false });
      }
    }
    if (policyRef) {
      if (policyRef.current!.classList.contains("active")) {
        setActiveStates({ ...activeStates, policy: true });
        return;
      } else {
        setActiveStates({ ...activeStates, policy: false });
      }
    }
    if (settingsRef) {
      if (settingsRef.current!.classList.contains("active")) {
        setActiveStates({ ...activeStates, settings: true });
        return;
      } else {
        setActiveStates({ ...activeStates, settings: false });
      }
    }
  }, [homeRef, billingRef, policyRef, settingsRef]);

  return activeStates;
}
