export type INotificationItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
};

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
