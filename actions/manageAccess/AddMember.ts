import axios from "axios";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";
import { IMember, IUserGroupMember } from "@/app/utilities/manageAccess/types/types"; 

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const updateMemberAction = async (creds: IUserGroupMember, userID: string): Promise<ApiResponse<IMember>> => {
  const API_URL = useRecoilValue(AAPIURL);
  
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