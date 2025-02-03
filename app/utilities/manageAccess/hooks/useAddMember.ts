// Library
import { useState } from "react";

// Types and Actions
import { IMember, IUserGroupMember } from "../types/types";
import { ApiResponse, updateMemberAction } from "@/actions/manageAccess/AddMember";

interface AddMember {
  addMember: (credentials: IUserGroupMember, userID: string) => Promise<void>;
  data: IMember | null;
  isLoading: boolean;
  error: string | null;
}

const useUpdateMember = (): AddMember => {
  const [data, setData] = useState<IMember | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addMember = async (credentials: IUserGroupMember, userID: string) => {
    setLoading(true);
    setError(null);

    const result: ApiResponse<IMember> = await updateMemberAction(credentials, userID);

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return { addMember, data, isLoading, error }
}

export default useUpdateMember;
