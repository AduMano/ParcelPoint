import { useState } from 'react';
import { loginUser, LoginRequest, LoginResponse, ApiResponse } from '@/actions/auth/Login';
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";
import { useRecoilValue } from "recoil";

interface UseLoginReturn {
  login: (credentials: LoginRequest) => Promise<void>;
  data: LoginResponse | null;
  isLoading: boolean;
  error: string | null;
}

const useLoginUser = (): UseLoginReturn => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = useRecoilValue(AAPIURL);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<LoginResponse> = await loginUser(credentials, API_URL ?? "");

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { login, data, isLoading, error };
};

export default useLoginUser;
