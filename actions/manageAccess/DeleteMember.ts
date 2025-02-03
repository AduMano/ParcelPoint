import axios from "axios";
import { API_URL } from '@/actions/config';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const deleteMemberAction = async (creds: string | string[]): Promise<ApiResponse<string | string[]>> => {
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
    console.log("ManageAccess | DeleteMember: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
      console.log(errorMessage);
    return { data: null, error: errorMessage };
  }
};