import { SetStateAction, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import SvgBill from "assets/icons/SvgBill";
import SvgHome from "assets/icons/SvgHome";
import SvgPolicy from "assets/icons/SvgPolicy";
import SvgSettings from "assets/icons/SvgSettings";
import SvgSignOut from "assets/icons/SvgSignOut";

import NestMenuBtn from "components/buttons/menuBtn/MenuBtn";
import FullLogo from "src/components/common/fullLogo/FullLogo";

import "src/layout/header/header.css";

import useNoBGScroll from "utils/hooks/general/useNoBGScroll";
import { useScreenWidth } from "utils/hooks/general/useScreenWidth";
import useCheckActive from "utils/hooks/header/useCheckActive";

type HeaderProps = {
  logOut: (action: string) => void;
};

export default function Header({ logOut }: HeaderProps) {
  const settingsRef = useRef<HTMLAnchorElement>(null);
  const billingRef = useRef<HTMLAnchorElement>(null);
  const policyRef = useRef<HTMLAnchorElement>(null);
  const homeRef = useRef<HTMLAnchorElement>(null);

  const [homeFilled, setHomeFilled] = useState(false);
  const [billingFilled, setBillingFilled] = useState(false);
  const [policyFilled, setPolicyFilled] = useState(false);
  const [settingsFilled, setSettingsFilled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  const activeStates = useCheckActive(homeRef, billingRef, policyRef, settingsRef);
  const breakpoint = useScreenWidth();
  useNoBGScroll(isOpen);

  const onClose = () => setShowSignOut(false);
  const toggleDropDown = () => setIsOpen((prev) => !prev);
  const setFilled = (event: "ENTER" | "LEAVE", setter: React.Dispatch<SetStateAction<boolean>>) => {
    if (event === "ENTER") setter(true);
    if (event === "LEAVE") setter(false);
  };

  return (
    <header className="site-header" id="main-header">
      <div className="header-group">
        <NestMenuBtn action={toggleDropDown} isOpen={isOpen} isVisible={breakpoint !== "DESKTOP"} />
        <Link to="/home" aria-label="Home" className="header-logo">
          <FullLogo />
        </Link>
        <Link to="/setting" className="settings-link-mobile" aria-label="Settings">
          <SvgSettings filled />
        </Link>
      </div>
      <nav className={isOpen ? "open" : ""}>
        <NavLink
          to="/home"
          className="nav-item"
          ref={homeRef}
          onMouseEnter={() => setFilled("ENTER", setHomeFilled)}
          onMouseLeave={() => setFilled("LEAVE", setHomeFilled)}
        >
          <SvgHome filled={homeFilled || activeStates.home} />
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/billing"
          className="nav-item"
          ref={billingRef}
          onMouseEnter={() => setFilled("ENTER", setBillingFilled)}
          onMouseLeave={() => setFilled("LEAVE", setBillingFilled)}
        >
          <SvgBill filled={billingFilled || activeStates.billing} />
          <p>Billing</p>
        </NavLink>
        <NavLink
          to="/mypolicies"
          className="nav-item"
          ref={policyRef}
          onMouseEnter={() => setFilled("ENTER", setPolicyFilled)}
          onMouseLeave={() => setFilled("LEAVE", setPolicyFilled)}
        >
          <SvgPolicy filled={policyFilled || activeStates.policy} />
          <p>Policy</p>
        </NavLink>
        <NavLink
          to="/setting"
          className="nav-item desktop-settings"
          ref={settingsRef}
          onMouseEnter={() => setFilled("ENTER", setSettingsFilled)}
          onMouseLeave={() => setFilled("LEAVE", setSettingsFilled)}
        >
          <SvgSettings filled={settingsFilled || activeStates.settings} />
          <p> Settings </p>
        </NavLink>
        <button className="nav-item" onClick={() => setShowSignOut(true)}>
          <SvgSignOut />
          <p>Sign out</p>
        </button>
      </nav>
      {/* <ConfirmModal
        isOpen={showSignOut}
        onClose={onClose}
        onConfirm={() => logOut("signOut")}
        content={signOutContent}
      /> */}
      <div className="modal-overlay" onClick={toggleDropDown}></div>
    </header>
  );
}
