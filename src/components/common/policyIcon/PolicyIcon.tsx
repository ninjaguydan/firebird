import React from "react";

import SvgAuto from "assets/icons/SvgAuto";
import SvgHomwowners from "assets/icons/SvgHomeowners";
import SvgLife from "assets/icons/SvgLife";
import SvgMedicare from "assets/icons/SvgMedicare";
import SvgUmbrella from "assets/icons/SvgUmbrella";

interface PolicyIconProps {
  category: String;
  fill?: any;
  size?: number;
}

const PolicyIcon: React.FC<PolicyIconProps> = ({ category = "", fill, size }) => {
  const defaultFill = "#26a0c2";
  const defaultSize = 24;

  switch (category?.toLowerCase()) {
    case "medicare supplement":
      return (
        <SvgMedicare
          fill={fill || defaultFill}
          width={size || defaultSize}
          height={size || defaultSize}
          className={"default"}
        />
      );
    case "life":
      return (
        <SvgLife
          fill={fill || defaultFill}
          width={size || defaultSize}
          height={size || defaultSize}
          className={"default"}
        />
      );
    case "term life":
      return (
        <SvgLife
          fill={fill || defaultFill}
          width={size || defaultSize}
          height={size || defaultSize}
          className={"default"}
        />
      );
    case "umbrella":
      return (
        <SvgUmbrella
          fill={fill || defaultFill}
          width={size || defaultSize}
          height={size || defaultSize}
          className={"default"}
        />
      );
    case "personal auto":
      return (
        <SvgAuto
          fill={fill || defaultFill}
          width={size || defaultSize}
          height={size || defaultSize}
          className={"default"}
        />
      );
    default:
      return (
        <SvgHomwowners
          fill={fill || defaultFill}
          width={size || defaultSize}
          height={size || defaultSize}
          className={"default"}
        />
      );
  }
};

export default PolicyIcon;
