import { useState } from 'react';
import { ApiResponse, UpdatePass } from '@/actions/auth/UpdatePassword';

interface UseLoginReturn {
  updatePass: (email: string, password: string) => Promise<void>;
  data: boolean | null;
  isLoading: boolean;
  error: string | null;
}

const useUpdatePassword = (): UseLoginReturn => {
  const [data, setData] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updatePass = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const result: ApiResponse<boolean> = await UpdatePass(email, password);

    if (result.data != null) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { updatePass, data, isLoading, error };
};

export default useUpdatePassword;
