import axios from "axios";
import { IMember } from "@/app/utilities/manageAccess/types/types";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const getMemberList = async ( userID: string ): Promise<ApiResponse<IMember[]>> => {
  const API_URL = useRecoilValue(AAPIURL);
  
  try {
    const { data } = await axios.get<IMember[]>(API_URL + "UserGroups/GetMemberList/" + userID,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    console.log("Home: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};