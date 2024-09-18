import React from "react";

import SvgApp from "src/assets/icons/SvgApp";
import SvgChat from "src/assets/icons/SvgChat";
import SvgEmail from "src/assets/icons/SvgEmail";
import SvgPhone from "src/assets/icons/SvgPhone";

import { AUTH_APP, EMAIL, IMfaMethods, TEXT_MESSAGE } from "src/utils/interfaces/auth/IMFA";

export default function MFAButtonIcon({ method }: { method: keyof IMfaMethods }) {
  switch (method) {
    case TEXT_MESSAGE:
      return <SvgChat fill={"#1E7F9A"} />;
    case EMAIL:
      return <SvgEmail fill={"#1E7F9A"} filled />;
    case AUTH_APP:
      return <SvgApp fill={"#1E7F9A"} />;
    default:
      return <SvgPhone fill={"#1E7F9A"} filled />;
  }
}
