import axios from "axios";
import { INotificationItem } from "@/app/utilities/notification/types/types";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const getNotificationList = async ( userID: string, API_URL: string ): Promise<ApiResponse<INotificationItem[]>> => {
  try {
    const { data } = await axios.get<INotificationItem[]>(API_URL + "Users/GetUserNotifications/" + userID,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    console.log("Home | NotificationList: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};