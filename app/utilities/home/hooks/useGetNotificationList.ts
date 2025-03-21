import { useState } from 'react';
import { INotificationItem } from '../../notification/types/types';
import { ApiResponse, getNotificationList } from '@/actions/home/GetNotificationList';
import { useRecoilValue } from 'recoil';  
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";

interface UseGetInfoReturn {
  fetchNotificationList: (userID: string) => Promise<void>;
  data: INotificationItem[] | null;
  isLoading: boolean;
  error: string | null;
}

const useGetNotificationList = (): UseGetInfoReturn => {
  const [data, setData] = useState<INotificationItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = useRecoilValue(AAPIURL);

  const fetchNotificationList = async (userID: string) => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<INotificationItem[]> = await getNotificationList(userID, API_URL ?? "");  

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { fetchNotificationList, data, isLoading, error };
};

export default useGetNotificationList;
