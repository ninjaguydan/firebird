import { IUserObject } from "src/utils/interfaces/registration/IUser";
import {
  validateAddress,
  validateApartment,
  validateCity,
  validateDob,
  validateEmail,
  validateFName,
  validateLName,
  validatePhone,
  validateSSN,
  validateUsername,
  validateZip,
} from "src/utils/validators/validators";

export function registrationValidator(formObject: IUserObject) {
  let errors: IUserObject = {
    username: validateUsername(formObject.username),
    fname: validateFName(formObject.fname),
    lname: validateLName(formObject.lname),
    email: validateEmail(formObject.email),
    phone: validatePhone(formObject.phone),
    dob: validateDob(formObject.dob),
    address: validateAddress(formObject.address),
    state: "",
    apt: validateApartment(formObject.apt || null),
    city: validateCity(formObject.city),
    zip: validateZip(formObject.zip),
    lastFourSocial: validateSSN(formObject.lastFourSocial),
  };
  return errors;
}
export function checkRequiredValues(formObject: IUserObject) {
  if (
    formObject.username !== "" &&
    formObject.fname !== "" &&
    formObject.lname !== "" &&
    formObject.email !== "" &&
    formObject.phone !== "" &&
    formObject.dob !== "" &&
    formObject.address !== "" &&
    formObject.city !== "" &&
    formObject.state !== "" &&
    formObject.zip !== "" &&
    formObject.lastFourSocial !== ""
  ) {
    return true;
  } else {
    return false;
  }
}
