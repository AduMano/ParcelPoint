// Library
import { useState } from "react";

// Actions
import { ApiResponse } from "@/actions/manageAccess/UpdateMember"

// Types
import { IUpdateMemberRequest } from "../types/types";
import { updateMemberAction } from "@/actions/manageAccess/UpdateMember";

// Hooks
import { useRecoilValue } from "recoil";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";

interface UpdateMember {
  updateMember: (credentials: IUpdateMemberRequest[]) => Promise<void>;
  data: IUpdateMemberRequest[] | null;
  isLoading: boolean;
  error: string | null;
}

const useUpdateMember = (): UpdateMember => {
  const [data, setData] = useState<IUpdateMemberRequest[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = useRecoilValue(AAPIURL);

  const updateMember = async (credentials: IUpdateMemberRequest[]) => {
    setLoading(true);
    setError(null);

    const result: ApiResponse<IUpdateMemberRequest[]> = await updateMemberAction(credentials, API_URL ?? ""); 

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return { updateMember, data, isLoading, error }
}

export default useUpdateMember;
