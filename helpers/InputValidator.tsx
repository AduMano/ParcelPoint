export const validate_email = (email: string) => {
  const result = {
    status: false,
    title: "",
    message: "",
  };

  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
