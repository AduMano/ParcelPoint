// User Information
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

// Others
export type TMember = {
  id: string;
  name: string;
  image: string;
};

export type TParcel = {
  id: string;
  name: string;
  trackingId: string;
  status: string;
};

export type ParcelItemProps = {
  parcel: TParcel;
};

export type MemberItemProps = {
  member: TMember;
};

export type TParcelDetail = {
  name: string;
  trackingId: string;
  status?: string;
}

export type TData = {
  parcels: TParcel[];
  members: TMember[];
};
