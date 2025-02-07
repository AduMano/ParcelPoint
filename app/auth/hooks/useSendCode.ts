import { useState } from 'react';
import { ApiResponse, SendCode } from '@/actions/auth/SendCode';

interface UseLoginReturn {
  sendCode: (email: string) => Promise<void>;
  data: string | null;
  isLoading: boolean;
  error: string | null;
}

const useSendCode = (): UseLoginReturn => {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const result: ApiResponse<string> = await SendCode(email);

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { sendCode, data, isLoading, error };
};

export default useSendCode;
