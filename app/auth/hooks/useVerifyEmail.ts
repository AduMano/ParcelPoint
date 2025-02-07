import { useState } from 'react';
import { ApiResponse, VerifyEmail } from '@/actions/auth/VerifyEmail';

interface UseLoginReturn {
  verifyEmail: (email: string) => Promise<void>;
  data: boolean | null;
  isLoading: boolean;
  error: string | null;
}

const useVerifyEmail = (): UseLoginReturn => {
  const [data, setData] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifyEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const result: ApiResponse<boolean> = await VerifyEmail(email);

    if (result.data != null) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { verifyEmail, data, isLoading, error };
};

export default useVerifyEmail;
