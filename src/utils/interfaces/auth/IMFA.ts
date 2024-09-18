export interface IMfaMethods {
  SMS: string;
  EMAIL: string;
  VOICE: string;
  TOTP: string;
}

export interface IDevice {
  id: string;
  phone?: string;
  email?: string;
  status: string;
  type: keyof IMfaMethods;
  usableStatus: { status: string };
}

export const TEXT_MESSAGE: keyof IMfaMethods = "SMS";
export const EMAIL: keyof IMfaMethods = "EMAIL";
export const VOICE: keyof IMfaMethods = "VOICE";
export const AUTH_APP: keyof IMfaMethods = "TOTP";

export const DEVICE_TYPES: (keyof IMfaMethods)[] = [AUTH_APP, TEXT_MESSAGE, VOICE, EMAIL];

export const MFA_METHODS = {
  SMS: {
    heading: "Text Message",
    desc: "Receive a text message with a passcode to authenticate.",
  },
  EMAIL: {
    heading: "Email",
    desc: "Receive an email with a passcode to authenticate.",
  },
  VOICE: {
    heading: "Voice",
    desc: "Receive a phone call with a passcode to authenticate.",
  },
  TOTP: {
    heading: "Authenticator app",
    desc: "Use an authenticator app (like Google authenticator) to authenticate.",
  },
};

export const demoDevices: IDevice[] = [
  {
    id: "c7f8b0ef-49c0-b009-8d0f8be865df",
    phone: "*******18",
    status: "ACTIVE",
    type: "SMS",
    usableStatus: { status: "ENABLED" },
  },
  {
    id: "c7f8b0ef-67gb-b009-8d0f8be865df",
    email: "ww****@wynnehs.edu",
    status: "ACTIVE",
    type: "EMAIL",
    usableStatus: { status: "ENABLED" },
  },
  {
    id: "c7f8b0ef-12pq-b009-8d0f8be865df",
    phone: "*******89",
    status: "ACTIVE",
    type: "VOICE",
    usableStatus: { status: "ENABLED" },
  },
  {
    id: "c7f8b0ef-vvvv-b009-8d0f8be865df",
    status: "ACTIVE",
    type: "TOTP",
    usableStatus: { status: "ENABLED" },
  },
];
