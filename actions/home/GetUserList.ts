import axios from "axios";
import { API_URL } from '@/actions/config';
import { IUserInformation } from "@/app/utilities/home/types/type";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const getUserList = async ( userID: string ): Promise<ApiResponse<IUserInformation[]>> => {
  const API_URL = useRecoilValue(AAPIURL);
  
  try {
    const { data } = await axios.get<IUserInformation[]>(API_URL + "UserGroups/GetUsersList/" + userID,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    console.log("Home | UserList: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};