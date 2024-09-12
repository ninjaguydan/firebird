import { useEffect, useState } from "react";

export function useScreenWidth() {
  const [breakpoint, setBreakpoint] = useState<"MOBILE" | "TABLET" | "DESKTOP">("MOBILE");

  useEffect(() => {
    const handleResize = () => {
      let screenWidth = window.innerWidth;
      if (screenWidth < 491) {
        setBreakpoint("MOBILE");
      } else if (screenWidth < 721) {
        setBreakpoint("TABLET");
      } else {
        setBreakpoint("DESKTOP");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
}
