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

export type TData = {
  parcels: TParcel[];
  members: TMember[];
};
