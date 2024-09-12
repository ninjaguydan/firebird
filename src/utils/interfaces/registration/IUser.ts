export interface IUserObject {
  username: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  lastFourSocial: string;
}

export const EMPTY_USER = {
  username: "heisenberg08",
  fname: "Walter",
  lname: "White",
  email: "wwhite@wynnehs.edu",
  phone: "5058429918",
  dob: "1958-09-07",
  address: "308 Negro Arroyo Lane",
  apt: "",
  city: "Albuquerque",
  state: "NM",
  zip: "87111",
  lastFourSocial: "0987",
};
