// Library
import { atom } from 'recoil';

// Types
import { IUserInformation } from '../types/type';
import { IMember } from '../../manageAccess/types/types';

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

export const memberList = atom<IMember[]>({
  key: "memberList",
  default: []
});

export const userList = atom<IUserInformation[]>({
  key: "userList",
  default: []
})