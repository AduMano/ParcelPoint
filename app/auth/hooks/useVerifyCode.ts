import { useState } from 'react';
import { ApiResponse, VerifyCode } from '@/actions/auth/VerifyCode';
import { useRecoilValue } from 'recoil';
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";

interface UseLoginReturn {
  verifyCode: (email: string, code: string) => Promise<void>;
  data: boolean | null;
  isLoading: boolean;
  error: string | null;
}

const useVerifyCode = (): UseLoginReturn => {
  const [data, setData] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = useRecoilValue(AAPIURL);

  const verifyCode = async (email: string, code: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const result: ApiResponse<boolean> = await VerifyCode(email, code, API_URL ?? "");

    if (result.data != null) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { verifyCode, data, isLoading, error };
};

export default useVerifyCode;
