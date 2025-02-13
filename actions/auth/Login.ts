import axios from "axios";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  username: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const loginUser = async ( loginData: LoginRequest ): Promise<ApiResponse<LoginResponse>> => {
  const API_URL = useRecoilValue(AAPIURL);
  
  try {
    const { data } = await axios.post<LoginResponse>(API_URL + "Auth/login",
      { ...loginData, type: "user" },
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