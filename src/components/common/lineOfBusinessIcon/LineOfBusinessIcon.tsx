import React from "react";

import SvgBuilding from "assets/icons/SvgBuilding";
import SvgDollarSign from "assets/icons/SvgDollarSign";
import SvgGroups from "assets/icons/SvgGroups";
import SvgAgencyInfo from "src/assets/icons/SvgAgencyInfo";
import SvgLife from "src/assets/icons/SvgLife";
import SvgUser from "src/assets/icons/SvgUser";

type LineOfBusinessIconType = {
  type:
    | "Personal"
    | "Commercial"
    | "Life"
    | "Group"
    | "Voluntary Products"
    | "Financial Products"
    | (string & {}); // "(string & {}) allows any string to pass while still providing autocomplete in the IDE"
};
export default function LineOfBusinessIcon({ type }: LineOfBusinessIconType) {
  switch (type) {
    case "Personal":
      return <SvgUser />;
    case "Commercial":
      return <SvgBuilding />;
    case "Life":
      return <SvgLife />;
    case "Group":
      return <SvgGroups className="group-icon" />;
    case "Voluntary Products":
      return <SvgAgencyInfo />;
    case "Financial Products":
      return <SvgDollarSign />;
    default:
      return <></>;
  }
}
