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
