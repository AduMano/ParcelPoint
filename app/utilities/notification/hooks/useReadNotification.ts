// Library
import { useState } from "react";

// Actions
import { ApiResponse, ReadNotificationAction } from "@/actions/home/ReadNotification";

// Hooks
import { useRecoilValue } from "recoil";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";

interface ReadNotification {
  readNotification: (credentials: string[]) => Promise<void>;
  data: boolean | null;
  isLoading: boolean;
  error: string | null;
}

const useReadNotification = (): ReadNotification => {
  const [data, setData] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = useRecoilValue(AAPIURL);

  const readNotification = async (credentials: string[]) => {
    setLoading(true);
    setError(null);

    const result: ApiResponse<boolean> = await ReadNotificationAction(credentials, API_URL ?? "");

    if (result.data) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return { readNotification, data, isLoading, error }
}

export default useReadNotification;
