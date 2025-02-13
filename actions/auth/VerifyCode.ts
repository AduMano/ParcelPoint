import axios from "axios";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const VerifyCode = async ( email: string, code: string, API_URL: string ): Promise<ApiResponse<boolean>> => {
  try {
    const { data } = await axios.post<boolean>(API_URL + "Auth/VerifyCode",
      { email, code },
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