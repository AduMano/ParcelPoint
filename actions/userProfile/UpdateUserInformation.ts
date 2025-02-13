import axios from "axios";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";
import { IUserUpdateInformation } from "@/app/utilities/userProfile/types/types";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const updateUserInformation = async ( credentials: IUserUpdateInformation ): Promise<ApiResponse<IUserUpdateInformation>> => {
  const API_URL = useRecoilValue(AAPIURL);
  
  try {
    const { data } = await axios.put<IUserUpdateInformation>(API_URL + "Users/UpdateInformation",
      { ...credentials },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return { data, error: null };
  } 
  catch (error: any) {
    console.log("User Profile: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};