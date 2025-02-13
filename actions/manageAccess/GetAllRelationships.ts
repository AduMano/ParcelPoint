import axios from "axios";
import { IUserRelationship } from "@/app/utilities/manageAccess/types/types"; 

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const getAllUserRelationships = async (API_URL: string): Promise<ApiResponse<IUserRelationship[]>> => {
  try {
    const { data } = await axios.get<IUserRelationship[]>(API_URL + "UserRelationship",
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