import axios from "axios";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const deleteMemberAction = async (creds: {Members: string[], GroupOwnerId: string}): Promise<ApiResponse<string | string[]>> => {
  const API_URL = useRecoilValue(AAPIURL);
  
  try {
    const { data } = await axios.delete<string | string[]>(API_URL + "UserGroups/DeleteMember",
      { 
        headers: { 'Content-Type': 'application/json' },
        data: creds
      }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};