export interface IUserInformation {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix?: string | null;
  birthDate: Date | string;
  address: string;
  contactNumber: string;
  photoUrl: string;
  email: string;
  username: string;
}

export interface IDate {
  date: Date
}

// Update User Information
export interface IUserUpdateInformation {
  id?: string;
  firstName: string;
  lastName: string;
  address: string;
  username: string;
  birthDate: Date | string;
}