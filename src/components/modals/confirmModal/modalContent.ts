import SvgCancel from "assets/icons/SvgCancel";
import SvgSignOut from "assets/icons/SvgSignOut";

export interface ConfirmModalContent {
  Icon: ({}: any) => JSX.Element;
  header: string;
  message: string;
  confirmText: string;
  closeText: string;
}

export const signOutContent: ConfirmModalContent = {
  Icon: SvgSignOut,
  header: "Are you sure you want to sign out now?",
  message:
    "In order to keep your account secure, you may have to go through the MFA process again.",
  confirmText: "Sign out",
  closeText: "Go back",
};
export const exitEditingStateConfirm: ConfirmModalContent = {
  Icon: SvgCancel,
  header: "Exit without saving?",
  message: "If you exit now, the changes you have made may not be saved.",
  confirmText: "Exit",
  closeText: "Keep editing",
};
