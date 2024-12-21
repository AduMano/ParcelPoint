// Action
import { GetUserByEmailAndPassword } from "@/actions/auth/Login";

// Interface
import { UseGetUserResult } from "../interface/interface";

// Library
import { useState } from "react";

const useGetUser = (): UseGetUserResult => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = async (username: string, password: string): Promise<void> => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await GetUserByEmailAndPassword(username, password);
      console.log(response);

      if (response.status === 200) {
        setData(response.data); // On success, set the returned data
      } else {
        setError(response.message); // Set the error message if status is not OK
      }
    } catch (err) {
      setError("Something went wrong!"); // Handle unexpected errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return { data, loading, error, getUser };
};

export default useGetUser;
