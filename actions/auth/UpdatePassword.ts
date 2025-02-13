import axios from "axios";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const UpdatePass = async ( email: string, password: string ): Promise<ApiResponse<boolean>> => {
  const API_URL = useRecoilValue(AAPIURL);
  
  try {
    const { data } = await axios.post<boolean>(API_URL + "Auth/UpdatePassword",
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    return { data, error: null };
  } 
  catch (error: any) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};