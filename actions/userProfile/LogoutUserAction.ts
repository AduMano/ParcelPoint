import axios, { Axios, AxiosError } from "axios";
import { API_URL } from '@/actions/config';

export const LogoutUserAction = async ( userID: string ): Promise<void> => {
  try {
    await axios.post(API_URL + "Auth/LogoutUser",
      userID,
      { headers: { 'Content-Type': 'application/json' } }
    );
  } 
  catch (error: any) {
    console.log("User Profile | Logout: ", error.response?.data);
  }
};