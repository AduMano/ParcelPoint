import axios from "axios";
import { API_URL } from '@/actions/config';
import { IUpdateMemberRequest } from "@/app/utilities/manageAccess/types/types"; 

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const updateMemberAction = async (creds: IUpdateMemberRequest[]): Promise<ApiResponse<IUpdateMemberRequest[]>> => {
  try {
    const param = { Members: creds };

    const { data } = await axios.put<IUpdateMemberRequest[]>(API_URL + "UserGroups/UpdateMember",
      param,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    console.log("ManageAccess | UpdateMember: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};