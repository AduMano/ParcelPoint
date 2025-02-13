import axios from "axios";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const ReadNotificationAction = async (creds: string[], API_URL: string): Promise<ApiResponse<boolean>> => {
  try {
    const { data } = await axios.put<boolean>(API_URL + "Users/ReadNotification",
      creds,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    const errorMessage = axios.isAxiosError(error)
    ? error.response?.data : "An unknown error had occured";
    console.log("Notificaiton | Read Notification: ", errorMessage);
    return { data: null, error: errorMessage };
  }
};