// Library
import { useState } from "react";

// Actions and Types
import { ApiResponse, deleteMemberAction } from "@/actions/manageAccess/DeleteMember";

interface DeleteMember {
  deleteMember: (credentials: { Members: string[], GroupOwnerId: string }) => Promise<void>;
  data: string | string[] | null;
  isLoading: boolean;
  error: string | null;
}

const useDeleteMember = (): DeleteMember => {
  const [data, setData] = useState<string | string[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMember = async (credentials: { Members: string[], GroupOwnerId: string}) => {
    setLoading(true);
    setError(null);

    const result: ApiResponse<string | string[]> = await deleteMemberAction(credentials);

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return { deleteMember, data, isLoading, error }
}

export default useDeleteMember;
