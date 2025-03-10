import axios from "axios";

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

export const loginUser = async ( loginData: LoginRequest, API_URL: string ): Promise<ApiResponse<LoginResponse>> => {
  try {
    console.log("Login Data: ", loginData);
    
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