// Helpers
import { getMonthNameDayYearByDate } from "./textFormatter";

//#region Email Validator
export const validate_email = (email: string): {status: boolean; title: string; message: string;} => {
  const result = {
    status: false,
    title: "",
    message: "",
  };

  const email_pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!email.match(email_pattern)) {
    result.title = "Invalid Input";
    result.message = "The E-Mail you entered is incorrect.";
  } else {
    result.status = true;
    result.title = "Valid Input";
    result.message = "The E-Mail you entered is correct.";
  }

  return result;
};
//#endregion

//#region Date (MDY) Comparator
export const isDateMonthNameDayYearEqual = (date_one: Date, date_two: Date): boolean => {
  return getMonthNameDayYearByDate(date_one) === getMonthNameDayYearByDate(date_two);
}

//#region Input Validator
export const validateInput = (value: string | string[], rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    const result = rule(value);
    if (result) return result; // Return the first error message if validation fails
  }
  return null; // Return null if all validations pass
};

// Rules
export type ValidationRule = (value: string | string[]) => string | null;

export const isNotEmpty: ValidationRule = (value) =>
  (Array.isArray(value) ? value.some((v) => v.trim() === "") : value.trim() === "") ? "Input fields cannot be empty." : null;

export const minLength = (min: number): ValidationRule => (value) => {
  if (typeof value === "string") {
    return value.trim().length < min
      ? `Input must contain at least ${min} characters.`
      : null;
  }
  return `Invalid input type. Expected a string.`;
};

// Email validation rule
export const isValidEmail: ValidationRule = (value) => {
  if (typeof value !== "string") return "Invalid input type. Expected a string.";
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  
  return emailRegex.test(value.trim()) ? null : "Invalid Gmail address.";
};

//#endregion