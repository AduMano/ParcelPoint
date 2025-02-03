// Library
import { useState } from "react";

// Actions
import { ApiResponse, updateUserInformation as UpdateUserInfo } from "@/actions/userProfile/UpdateUserInformation";

// Types
import { IUserUpdateInformation } from "../types/types";

interface UseUpdateInformation {
  updateUserInfo: (credentials: IUserUpdateInformation) => Promise<void>;
  data: IUserUpdateInformation | null;
  isLoading: boolean;
  error: string | null;
}

const useUpdateUserInformation = (): UseUpdateInformation => {
  const [data, setData] = useState<IUserUpdateInformation | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserInfo = async (credentials: IUserUpdateInformation) => {
    setLoading(true);
    setError(null);

    const result: ApiResponse<IUserUpdateInformation> = await UpdateUserInfo({
      ...credentials,
    });

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return { updateUserInfo, data, isLoading, error }
}

export default useUpdateUserInformation;
