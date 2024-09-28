import React from "react";

import SvgInfo from "assets/icons/SvgInfo";
import SvgUser from "assets/icons/SvgUser";

import { formatPhoneNumber } from "src/utils/helpers/formatters";

import { PersonalInfo } from "./Settings";

type PersonalInfoProps = {
  userPersonalInfo: PersonalInfo;
  fullAddressArray: [] | RegExpMatchArray;
  isLoading: boolean;
};

export default function SettingsPersonalInfo({ userPersonalInfo, isLoading }: PersonalInfoProps) {
  return (
    <>
      <h2 className="card-header alt">
        <SvgUser /> Personal Information
      </h2>
      <article className="settings-personal nest-card alt">
        <div className="info-field-row">
          <p>Name:</p>
          <p className={isLoading ? "loader-block" : ""}>
            {userPersonalInfo.name?.given} {userPersonalInfo.name?.family}
          </p>
        </div>
        <div className="info-field-row">
          <p>Email:</p>
          <p className={isLoading ? "loader-block" : ""}>{userPersonalInfo.email}</p>
        </div>
        <div className="info-field-row">
          <p>Phone #:</p>
          <p className={isLoading ? "loader-block" : ""}>
            {formatPhoneNumber(userPersonalInfo.primaryPhone)}
          </p>
        </div>
      </article>
      <div className="settings-info">
        <SvgInfo />
        <small>
          You may not edit your personal information within the portal at this time, if you need to
          change this information, please contact your agent.
        </small>
      </div>
    </>
  );
}
