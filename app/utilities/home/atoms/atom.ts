// Library
import { atom } from 'recoil';

// Types
import { IUserInformation, TParcelDetail } from '../types/type';
import { IMember } from '../../manageAccess/types/types';
import { INotificationItem } from '../../notification/types/types';

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
});

export const parcelList = atom<TParcelDetail[]>({
  key: "parcelList",
  default: []
});

export const notificationList = atom<INotificationItem[]>({
  key: "notificationList",
  default: []
});

export const API_URL = atom<string | null>({ 
  key: "API_URL",
  default: null
});