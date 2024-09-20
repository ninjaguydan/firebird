import React, { useState } from "react";

import SvgAdd from "assets/icons/SvgAdd";
import SvgPolicy from "assets/icons/SvgPolicy";

import HelpCard from "src/components/cards/helpCard/HelpCard";
import QuickLinks from "src/components/cards/quickLinks/QuickLinks";

import { useScreenWidth } from "src/utils/hooks/general/useScreenWidth";
import {
  BACKUP_POLICY_BILL_1,
  BACKUP_POLICY_BILL_2,
  BACKUP_POLICY_BILL_3,
} from "src/utils/interfaces/data/policyBillingDetails";

import HomeBillList from "./HomeBillList";
import HomeSearchForm from "./HomeSearchForm";
import "./styles/home.css";

export default function Home() {
  const [viewAddPolicy, setViewAddPolicy] = useState(false);
  const BILL_LIST = [BACKUP_POLICY_BILL_1, BACKUP_POLICY_BILL_2, BACKUP_POLICY_BILL_3];
  const breakpoint = useScreenWidth();
  const name = "Heisenberg08";

  return (
    <div className="homescreen">
      <div className="home-header-group-desktop">
        <p className="greeting">
          Hey {name}, <br />
          <span>We&apos;ve got you covered.</span>
        </p>
        <aside className="agency-help">
          <QuickLinks breakpoint={breakpoint} />
          {breakpoint === "DESKTOP" && <HelpCard />}
        </aside>
      </div>

      <section className="policies-and-payments section">
        <header className="section-header policies-header">
          <h2>
            <SvgPolicy filled />
            {viewAddPolicy || BILL_LIST.length === 0 ? "Add your policies" : "Your Policy Bills"}
          </h2>
          {!viewAddPolicy && BILL_LIST.length > 0 && (
            <button
              className="btn-nest tertiary new-policy-account"
              onClick={() => setViewAddPolicy(true)}
            >
              <SvgAdd /> Add new policy or account
            </button>
          )}
        </header>

        {viewAddPolicy || BILL_LIST.length === 0 ? (
          <HomeSearchForm
            onCancel={() => setViewAddPolicy(false)}
            hasPolicies={BILL_LIST.length > 0}
          />
        ) : (
          <HomeBillList bills={BILL_LIST} />
        )}
        {/* {!viewAddPolicy && currentItems.length > 0 && (
          <NestPagination range={range} totalItems={totalItems} step={step} />
        )} */}
      </section>
    </div>
  );
}
