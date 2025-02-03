import { useState } from 'react';
import { IUserInformation } from '../types/type';
import { ApiResponse, getUserList } from '@/actions/home/GetUserList';

interface UseGetInfoReturn {
  fetchUserList: (userID: string) => Promise<void>;
  data: IUserInformation[] | null;
  isLoading: boolean;
  error: string | null;
}

const useGetUserList = (): UseGetInfoReturn => {
  const [data, setData] = useState<IUserInformation[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserList = async (userID: string) => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<IUserInformation[]> = await getUserList(userID);

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { fetchUserList, data, isLoading, error };
};

export default useGetUserList;
