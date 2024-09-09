import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
  condition?: string;
};

export default function ScrollToTop({ condition }: ScrollToTopProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, condition]);
  return null;
}
