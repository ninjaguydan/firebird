const specialChar = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g;

export function sanitize(value: string) {
  return value.replace(specialChar, "");
}
