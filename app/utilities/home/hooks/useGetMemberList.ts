import { useState } from 'react';
import { ApiResponse, getMemberList } from '@/actions/home/GetMemberList';
import { IMember } from '../../manageAccess/types/types';

interface UseGetInfoReturn {
  fetchMembers: (userID: string) => Promise<void>;
  data: IMember[] | null;
  isLoading: boolean;
  error: string | null;
}

const useGetMemberList = (): UseGetInfoReturn => {
  const [data, setData] = useState<IMember[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async (userID: string) => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<IMember[]> = await getMemberList(userID);

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { fetchMembers, data, isLoading, error };
};

export default useGetMemberList;
