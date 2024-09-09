import "src/components/buttons/menuBtn/menu-btn.css";

type MenuBtnProps = {
  action: () => void;
  isOpen: boolean;
  isVisible: boolean;
};

export default function NestMenuBtn({ action, isOpen, isVisible }: MenuBtnProps) {
  if (!isVisible) return <></>;

  return (
    <button
      aria-label="Menu"
      aria-haspopup="true"
      aria-expanded={isOpen}
      className={`menu-btn ${isOpen ? "open" : ""}`}
      onClick={action}
    >
      <div className="menu-btn_burger"></div>
    </button>
  );
}
