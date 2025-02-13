import axios from "axios";
import { TParcelDetail } from "@/app/utilities/home/types/type";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const getParcelList = async ( userID: string, API_URL: string ): Promise<ApiResponse<TParcelDetail[]>> => {
  try {
    const { data } = await axios.get<TParcelDetail[]>(API_URL + "ParcelLogs/GetParcelLogs/" + userID,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { data, error: null };
  } 
  catch (error: any) {
    console.log("Home | ParcelList: ", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data : "An unknown error had occured";
    return { data: null, error: errorMessage };
  }
};