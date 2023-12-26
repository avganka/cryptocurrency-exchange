export const filterNumbers = (text: string) => {
  return text.replace(/[^\d-.]/g, '');
};
