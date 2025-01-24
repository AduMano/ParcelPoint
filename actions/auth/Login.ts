import axios from "axios";
import { API_URL } from '@/actions/config';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  username: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const loginUser = async ( loginData: LoginRequest ): Promise<ApiResponse<LoginResponse>> => {
  try {
    const { data } = await axios.post<LoginResponse>(API_URL + "Auth/login",
      { ...loginData, type: "user" },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    console.log(error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};