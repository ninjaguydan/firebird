const specialChar = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g;

export function sanitize(value: string) {
  return value.replace(specialChar, "");
}

export const hidePhone = (num: string | undefined) => {
  if (!num) return "";
  let hidden = num.split("").map((char, index) => {
    if (index === 2 || index === 5) {
      return "*-";
    } else if (index < 6) {
      return "*";
    } else {
      return char;
    }
  });
  return hidden;
};

export const hideEmail = (email: string | undefined) => {
  if (!email) return "";
  let hidden = email.split("").map((char, index) => {
    if (char === "@" || index < 2 || index > email.length - 7) return char;
    return "*";
  });
  return hidden;
};

export const toTitleCase = (string: string) => {
  let firstLetter = string.slice(0, 1).toUpperCase();
  let restOfName = string.slice(1);
  return firstLetter + restOfName;
};

export const formatPhoneNumber = (phoneNumberString: string | undefined) => {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumberString;
};

// replace any non acceptable Policy character with empty string
export function forcePolicyFormat(value: string) {
  let format = /([^a-zA-Z0-9-])+$/;
  return value.replace(format, "");
}

// replace any non numerical character with empty string
export function forceNumber(value: string) {
  let nonDigit = /\D/g;
  return value.replace(nonDigit, "");
}

// insert comma every 3 digits
export function formatNumber(value: string) {
  let threeDigitChunks = /\B(?=(\d{3})+(?!\d))/g;
  return forceNumber(value).replace(threeDigitChunks, ",");
}

// convert given input string to "0.00" format
// ex. ("1000") => "1,000.00"
export function formatCurrency(input: string, onBlur: boolean = false) {
  let value = input;
  let leadingZeros = /^0+(?!$)/g;

  if (value === "") return "";

  if (value.indexOf(".") >= 0) {
    let decimalPosition = value.indexOf(".");
    let leftSide = value.substring(0, decimalPosition);
    let rightSide = value.substring(decimalPosition);

    leftSide = formatNumber(leftSide).replace(leadingZeros, "");
    rightSide = formatNumber(rightSide);

    if (onBlur) rightSide += "00";

    rightSide = rightSide.substring(0, 2);

    value = `${leftSide}.${rightSide}`;
  } else {
    value = formatNumber(value).replace(leadingZeros, "");

    if (onBlur) value += ".00";
  }

  return value;
}

// convert given floating int to "$0.00" format
// ex. (1000.5) => "$1,000.50"
export function floatToCurrency(number: number) {
  if (Number.isNaN(number)) return "$0.00";
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return USDollar.format(number);
}

// convert given noun to plural.
// ex. (2, "egg") => "eggs"
// ex. (1, "egg") => "egg"
// ex. (0, "egg") => "eggs"
// ex. (4, "canary", "ies") => "canaries"
export function pluralizeString(count: number, noun: string, suffix: string = "s") {
  if (count === 1) return noun;

  if (noun.charAt(noun.length - 1).toLowerCase() === "y") {
    return `${noun.slice(0, -1)}${suffix}`;
  }

  return `${noun}${suffix}`;
}
