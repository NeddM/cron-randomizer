export const generateMinutes = (): string => {
  return Math.floor(Math.random() * 60).toString();
};
export const generateHours = (): string => {
  return Math.floor(Math.random() * 24).toString();
};
export const generateDayOfMonth = (): string => {
  return Math.floor(Math.random() * 28).toString();
};
export const generateMonth = (): string => {
  return Math.floor(Math.random() * 12).toString();
};
export const generateDayOfWeek = (): string => {
  return Math.floor(Math.random() * 7).toString();
};
