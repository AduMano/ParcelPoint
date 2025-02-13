import { useState } from 'react';
import { TParcelDetail } from '../types/type';
import { ApiResponse, getParcelList } from '@/actions/home/GetParcelList';

interface UseGetInfoReturn {
  fetchParcelList: (userID: string) => Promise<void>;
  data: TParcelDetail[] | null;
  isLoading: boolean;
  error: string | null;
}

const useGetUserInfo = (): UseGetInfoReturn => {
  const [data, setData] = useState<TParcelDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParcelList = async (userID: string) => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<TParcelDetail[]> = await getParcelList(userID);

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { fetchParcelList, data, isLoading, error };
};

export default useGetUserInfo;
