import axios from "axios";
import { API_URL } from '@/actions/config';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const UpdatePass = async ( email: string, password: string ): Promise<ApiResponse<boolean>> => {
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