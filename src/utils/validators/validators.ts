export function validateUsername(value: string) {
  if (value) {
    const trimmedValue = value.trim();
    if (trimmedValue.length < 4) {
      return "Username must be at least 4 characters.";
    } else if (trimmedValue.length > 20) {
      return "Username can't be more than 20 characters.";
    } else if (/^[0-9]+$/.test(trimmedValue)) {
      return "Username must contain at least one letter.";
    } else if (/[^a-zA-Z0-9_.-]/.test(trimmedValue)) {
      return "Username contains invalid characters. Only letters, numbers, underscores (_), hyphens (-), and periods (.) are allowed.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function validateFName(value: string) {
  if (value) {
    const trimmedValue = value.trim();
    if (trimmedValue.length < 2) {
      return "First name must be at least 2 characters.";
    } else if (trimmedValue.length > 30) {
      return "First name can't be more than 30 characters.";
    } else if (/^[0-9]+$/.test(trimmedValue)) {
      return "First name must contain at least one letter.";
    } else if (/[^a-zA-Z ]/.test(trimmedValue)) {
      return "First name contains invalid characters. Only letters and spaces are allowed.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function validateLName(value: string) {
  if (value) {
    const trimmedValue = value.trim();
    if (trimmedValue.length < 2) {
      return "Last name must be at least 2 characters.";
    } else if (trimmedValue.length > 30) {
      return "Last name can't be more than 30 characters.";
    } else if (/^[0-9]+$/.test(trimmedValue)) {
      return "Last name must contain at least one letter.";
    } else if (/[^a-zA-Z ]/.test(trimmedValue)) {
      return "Last name contains invalid characters. Only letters and spaces are allowed.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function validateEmail(value: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value) {
    if (value.length < 8 || value.length > 60) {
      return "Email must be between 8 and 60 characters long.";
    }
    if (!re.test(value)) {
      return "Please enter a valid email.";
    }
  } else {
    return "";
  }
  return "";
}

export function validatePhone(value: string) {
  const re = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (value) {
    if (!re.test(value)) {
      return "Please enter a valid US phone number.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function validateDob(value: string) {
  let now = new Date();
  let dob = new Date(value);
  let year = now.getFullYear();
  let inputYear = dob.getFullYear();
  if (value) {
    if (dob > now) {
      return "Please enter a past date.";
    } else if (inputYear > year - 9 || inputYear < year - 119) {
      return "Invalid Date";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function validateZip(value: string) {
  const re = /^\d{5}[-\s]?(?:\d{4})?$/gm;
  if (value) {
    if (value.length > 5 || !re.test(value)) {
      return "Please enter a valid zip code.";
    }
    const parts = value.split(/[-\s]/);
    if (parts.every((part) => /^0+$/.test(part))) {
      return "Zip code cannot consist of only zeros.";
    }
    return "";
  } else {
    return "";
  }
}

export function validateSSN(value: string) {
  const re = /^\d{4}$/;
  if (value) {
    if (!re.test(value)) {
      return "Please enter a valid 4-digit number.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function validatePolicyNumber(value: string): string {
  var minDigits = 4;
  if (value) {
    const digitLength = value.length;
    const re = /^[a-zA-Z0-9-]+$/;
    if (!re.test(value)) {
      return "Policy or account # can only contain letters, numbers, and hyphens(-).";
    }
    if (digitLength < minDigits) {
      return `Policy or account # must contain atleast ${minDigits} digits.`;
    }
    if (/^0+$/.test(value)) {
      return "Policy or account # cannot consist of only zeros.";
    }
    return "";
  } else {
    return "";
  }
}
export function validateApartment(value: string | null) {
  if (value) {
    if (value.length < 3) {
      return "Apartment must be at least 3 characters.";
    } else if (value.length > 50) {
      return "Apartment can't be more than 50 characters.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}
export function validateCity(value: string) {
  const re = /^[a-zA-Z\u0080-\u024F\s\-']/;
  if (value) {
    if (value.length < 2) {
      return "City must be at least 2 characters.";
    } else if (value.length > 50) {
      return "City can't be more than 50 characters.";
    } else if (!re.test(value)) {
      return "Please enter a valid City.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function validateAddress(value: string) {
  const re = /^[a-zA-Z0-9\s,.'-]/;
  if (value) {
    if (value.length < 3) {
      return "Address must be at least 3 characters.";
    } else if (value.length > 50) {
      return "Address can't be more than 50 characters.";
    } else if (!re.test(value)) {
      return "Please enter a valid Address.";
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function checkIfEmptyObject(object: { [key: string]: any }) {
  let values = Object.values(object);
  return values.every((x) => x === null || x === "" || x === undefined);
}
