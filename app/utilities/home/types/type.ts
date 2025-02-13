// User Information
export interface IUserInformation {
  id?: string;
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

// Others
export type TMember = {
  id: string;
  name: string;
  image: string;
};

export type TParcel = {
  id: string;
  parcelName: string;
  parcelId: string;
  status: string;
};

export type ParcelItemProps = {
  parcel: TParcel;
};

export type MemberItemProps = {
  member: IUserInformation;
};

export type TParcelDetail = {
  id?: string;
  parcelId?: string;
  parcelName?: string;
  lockerNumber?: number;
  status?: string;
  action?: string;
  arrivedAt?: Date;
  retrievedAt?: Date;
  retrievedBy?: string;
  createdAt?: Date;
  userId?: string;
}

export type TData = {
  parcels: TParcelDetail[];
  members: IUserInformation[];
};
