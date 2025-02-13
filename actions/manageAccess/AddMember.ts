import axios from "axios";
import { IMember, IUserGroupMember } from "@/app/utilities/manageAccess/types/types"; 

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const updateMemberAction = async (creds: IUserGroupMember, userID: string, API_URL: string): Promise<ApiResponse<IMember>> => {
  try {
    const { data } = await axios.post<IMember>(API_URL + "UserGroups/CreateMember",
      {...creds, CreatedBy: userID},
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