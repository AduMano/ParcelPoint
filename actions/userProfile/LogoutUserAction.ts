import axios, { Axios, AxiosError } from "axios";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";

export const LogoutUserAction = async ( userID: string ): Promise<void> => {
  const API_URL = useRecoilValue(AAPIURL);
  
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