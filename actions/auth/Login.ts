import axios from "axios";

const API_URL = "http://localhost:5064/api"; // Put actual URL

interface GetUserResponse {
  status: number;
  message: string;
  data: any;
}

export const GetUserByEmailAndPassword = async (
  username: string,
  password: string
): Promise<GetUserResponse> => {
  try {
    const response = await axios.post(`http://localhost:5064/api/Movies`, {
      username,
      password,
    });

    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    // Return a structured error if request fails
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Unknown error occurred",
      data: null,
    };
  }
};
