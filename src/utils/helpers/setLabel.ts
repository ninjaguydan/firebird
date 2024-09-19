export const setLabel = (value: string) => {
  if (value === "Total Amount Due") return "Outstanding balance";
  if (value === "Minimum Amount Due") return "Minimum due";
  if (value === "Reinstatement Amount") return "Reinstatement";
  return value;
};
