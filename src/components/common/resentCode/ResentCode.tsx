import SvgSuccess from "src/assets/icons/SvgSuccess";

import "src/components/common/resentCode/resent-code.css";

export default function ResentCode() {
  return (
    <div className="resend-code-action">
      <SvgSuccess />
      <p>Another code has been sent</p>
    </div>
  );
}
