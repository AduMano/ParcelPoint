// Library
import { atom } from 'recoil';

// Types
import { IUserInformation } from '../types/type';

export const userID = atom<string | null>({
  key: 'userID',
  default: null
});

export const userInformation = atom<IUserInformation>({
  key: 'userInformation',
  default: {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthDate: new Date(),
    address: "",
    contactNumber: "",
    photoUrl: "",
    email: "",
    username: ""
  }
});