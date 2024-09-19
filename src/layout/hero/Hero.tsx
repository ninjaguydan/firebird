import loginBackground from "assets/images/loginBackground.png";
import SvgFirebird from "src/assets/icons/SvgFirebird";

import FullLogo from "src/components/common/fullLogo/FullLogo";

import "src/layout/hero/hero.css";

import { useScreenWidth } from "utils/hooks/general/useScreenWidth";

const DefaultIMG = (
  <img src={loginBackground} alt="man hugging his two children" className="hero-bg" />
);

type HeroProps = {
  subheader?: string;
  img?: JSX.Element;
};

export default function Hero({ subheader = "Why we do what we do", img = DefaultIMG }: HeroProps) {
  const path = location.pathname;
  const fitContent = () => (path === "/registration" ? "fit-content" : "");
  const breakpoint = useScreenWidth();

  return (
    <section className={`hero ${fitContent()}`}>
      {img}
      {breakpoint !== "DESKTOP" ? (
        <FullLogo vertical className="mobile-logo" />
      ) : (
        <div className="hero-text">
          <SvgFirebird />
          <h1>
            MyFI Customer Portal <br /> <span>{subheader}</span>
          </h1>
        </div>
      )}
    </section>
  );
}
