import React, { SetStateAction, useState } from "react";

import SvgInfo from "assets/icons/SvgInfo";
import SvgPayment from "assets/icons/SvgPayment";

import CollapseBtn from "src/components/buttons/collapseBtn/CollapseBtn";
import NestSwitch from "src/components/inputs/nestSwitch/NestSwitch";

import { PersonalInfo } from "./Settings";

type BillingProps = {
  userPersonalInfo: PersonalInfo;
  setUserPersonalInfo: React.Dispatch<SetStateAction<PersonalInfo>>;
  isLoading: boolean;
};

export default function SettingsBillingForm({ userPersonalInfo, isLoading }: BillingProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [paperless, setPaperless] = useState(false);

  return (
    <article className="billing-form">
      <h3 className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <SvgPayment /> Billing
        <CollapseBtn isExpanded={isExpanded} setIsExpanded={setIsExpanded} withLabel={false} />
      </h3>
      {isExpanded && (
        <>
          <div>
            <h4>Paperless Billing</h4>
            <p>Receive bill due notifications and statements via email.</p>
          </div>

          <div className="toggle-group">
            <NestSwitch
              onToggle={() => setPaperless((prev) => !prev)}
              ON={paperless}
              ariaLabel="Toggle Paperless Billing"
            />
            <label className={`paperless ${paperless ? "ON" : "OFF"}`}>
              {paperless ? "on" : "off"}
            </label>
          </div>

          <div className="settings-info">
            <SvgInfo />
            <small>
              Paperless billing reduces clutter, saves time, and helps out the evironment.
            </small>
          </div>

          <div>
            <h4 className="field-label">Billing Email Address</h4>
            <p className={isLoading ? "loader-block field-input" : "field-input"}>
              {userPersonalInfo.email}
            </p>
          </div>
        </>
      )}
    </article>
  );
}
