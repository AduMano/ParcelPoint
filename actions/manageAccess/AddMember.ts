import axios from "axios";
import { API_URL } from '@/actions/config';
import { IMember, IUserGroupMember } from "@/app/utilities/manageAccess/types/types"; 

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const updateMemberAction = async (creds: IUserGroupMember, userID: string): Promise<ApiResponse<IMember>> => {
  try {
    console.log({...creds, CreatedBy: userID});
    const { data } = await axios.post<IMember>(API_URL + "UserGroups/CreateMember",
      {...creds, CreatedBy: userID},
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    console.log("ManageAccess | AddMember: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
      console.log(errorMessage);
    return { data: null, error: errorMessage };
  }
};