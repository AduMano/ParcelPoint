// Library
import { useState } from "react";

// Types
import { IUserRelationship } from "../types/types";

// Actions
import { ApiResponse, getAllUserRelationships } from "@/actions/manageAccess/GetAllRelationships";

interface UseGetRelationshipReturn {
  fetchUserRelationships: () => Promise<void>;
  data: IUserRelationship[] | null;
  isLoading: boolean;
  error: string | null;
}

const useGetAllUserRelationships = (): UseGetRelationshipReturn => {
  const [data, setData] = useState<IUserRelationship[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRelationships = async () => {
    setIsLoading(true);
    setError(null);

    const result: ApiResponse<IUserRelationship[]> = await getAllUserRelationships();

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return { fetchUserRelationships, data, isLoading, error };
};

export default useGetAllUserRelationships;