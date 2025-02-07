import axios from "axios";
import { API_URL } from '@/actions/config';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const SendCode = async ( email: string ): Promise<ApiResponse<string>> => {
  try {
    const { data } = await axios.post<string>(API_URL + "Auth/SendVerificationCode",
      email,
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