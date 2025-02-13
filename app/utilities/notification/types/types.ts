import { TParcelDetail } from "@/app/utilities/home/types/type";

export interface INotificationItem {
  id: string; // Guid stored as a string
  title: string;
  context: string;
  lockerNumber: number;
  createdAt?: Date; // Nullable DateTime
  isRead: boolean; // Nullable boolean
  retrievedBy?: string;
  userId: string; // Guid stored as a string
}

export type TNotificationDetails = {
  id: string;
  modalTitle: string;
  modalDescription: string;
  dateTime: string;
  
  expirationDate?: string;
  retrievedBy?: string;
  lockerNumber?: string;
}

export interface IData {
  data?: string;
}

export interface HomeList {
  parcel: TParcelDetail,
  notification: INotificationItem
}
