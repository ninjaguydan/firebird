export default function Header() {
  return (
    <header className="site-header" id="main-header">
      <div className="header-group">
        <NestMenuBtn action={toggleDropDown} isOpen={isOpen} isVisible={breakpoint < 721} />
        <Link to="/home" aria-label="MyPI Home">
          <SvgPekinLogo />
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
      <ConfirmModal
        isOpen={showSignOut}
        onClose={onClose}
        onConfirm={() => logOut("signOut")}
        content={signOutContent}
      />
      <div className="modal-overlay" onClick={toggleDropDown}></div>
    </header>
  );
}
