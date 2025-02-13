import { TParcelDetail } from "@/app/utilities/home/types/type";

export const shortenText = (input: string, maxLength: number = 17): string => {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength - 3) + "...";
};

export const getMonthNameDayYearByDate = (date: Date): string => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString('en-US', {
    month: 'long', // Full month name
    day: 'numeric', // Day of the month
    year: 'numeric', // Year
  });
}

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(/,([^,]*)$/, ' at$1');
}

export const addHours = (date: Date, hours: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

export const getRemainingHours = (dbDateTime: any, hoursToPass: number): number => {
  if (!dbDateTime) {
      console.error("Error: dbDateTime is undefined or null");
      return 0;
  }

  let targetDate: Date;
  
  // Ensure dbDateTime is a valid Date object
  if (dbDateTime instanceof Date) {
      targetDate = dbDateTime;
  } else {
      targetDate = new Date(dbDateTime);
  }

  if (isNaN(targetDate.getTime())) {
      console.error("Error: Invalid Date format", dbDateTime);
      return 0;
  }

  const targetTime = new Date(targetDate.getTime() + hoursToPass * 60 * 60 * 1000);
  const now = new Date();

  const differenceMs = targetTime.getTime() - now.getTime();
  return Math.max(0, differenceMs / (1000 * 60 * 60)); // Convert ms to hours
}

export function getMinMaxArrivedAt(parcels: TParcelDetail[]): { minDate: Date | null, maxDate: Date | null } {
  if (parcels.length === 0) return { minDate: null, maxDate: null };
  
  // Filter parcels that have valid arrivedAt dates
  const validDates = parcels
  .map(parcel => parcel.arrivedAt ? new Date(parcel.arrivedAt) : null) // Ensure conversion
  .filter((date): date is Date => date instanceof Date && !isNaN(date.getTime()));
  
  if (validDates.length === 0) return { minDate: null, maxDate: null };
  
  // Find min and max dates
  const minArrivedAt = new Date(Math.min(...validDates.map(date => date.getTime())));
  const maxArrivedAt = new Date(Math.max(...validDates.map(date => date.getTime())));

  // Adjust min to 00:00 AM
  minArrivedAt.setHours(0, 0, 0, 0);

  // Adjust max to 11:59 PM
  maxArrivedAt.setHours(23, 59, 59, 0);

  return { minDate: minArrivedAt, maxDate: maxArrivedAt };
}

export const stringDatetoObjectDate = (dateString: string): Date => {
  // Try parsing with the Date constructor
  const date = new Date(dateString);
  return date;
}