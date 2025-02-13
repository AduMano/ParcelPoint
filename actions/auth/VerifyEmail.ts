import axios from "axios";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const VerifyEmail = async ( email: string, API_URL: string ): Promise<ApiResponse<boolean>> => {
  try {
    const { data } = await axios.get<boolean>(API_URL + "Auth/VerifyEmail/" + email,
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