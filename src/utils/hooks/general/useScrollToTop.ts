import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(condition: string = "") {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, condition]);
  return null;
}
