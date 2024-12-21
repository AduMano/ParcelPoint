export const shortenText = (input: string, maxLength: number = 17) => {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength - 3) + "...";
};
