export interface ContactInfo {
  userId: string;
  phone: string;
  email: string;
  name: string;
  username: string;
}
export const EMPTY_CONTACT: ContactInfo = {
  userId: "",
  phone: "",
  email: "",
  name: "",
  username: "",
};
