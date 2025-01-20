export const shortenText = (input: string, maxLength: number = 17): string => {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength - 3) + "...";
};

export const getMonthNameDayYearByDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long', // Full month name
    day: 'numeric', // Day of the month
    year: 'numeric', // Year
  });
}

export const stringDatetoObjectDate = (dateString: string): Date => {
  // Try parsing with the Date constructor
  const date = new Date(dateString);
  return date;
}