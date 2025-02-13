import { useState } from 'react';
import { IUserInformation } from '../types/type';
import { ApiResponse, getUserInformation } from '@/actions/home/GetUserInformation';
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";

interface UseGetInfoReturn {
  fetchUserInfo: (userID: string) => Promise<void>;
  data: IUserInformation | null;
  isLoading: boolean;
  error: string | null;
}

const useGetUserInfo = (): UseGetInfoReturn => {
  const [data, setData] = useState<IUserInformation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = useRecoilValue(AAPIURL);

  const fetchUserInfo = async (userID: string) => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<IUserInformation> = await getUserInformation(userID, API_URL ?? "");

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { fetchUserInfo, data, isLoading, error };
};

export default useGetUserInfo;
