import SvgFirebird from "assets/icons/SvgFirebird";

import "src/components/common/fullLogo/full-logo.css";

type fullLogoProps = {
  vertical?: boolean;
  className?: string;
};

export default function FullLogo({ vertical = false, className = "" }: fullLogoProps) {
  return (
    <div className={`fire-bird-logo ${vertical ? "vertical" : ""} ${className}`}>
      <SvgFirebird />
      <div className="word-mark">
        <p className="logo-header">Firebird</p>
        <p className="logo-subheader">Insurance</p>
      </div>
    </div>
  );
}
