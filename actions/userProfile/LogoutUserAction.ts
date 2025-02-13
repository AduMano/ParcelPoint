import axios, { Axios, AxiosError } from "axios";

export const LogoutUserAction = async ( userID: string, API_URL: string ): Promise<void> => {
  try {
    await axios.post(API_URL + "Auth/LogoutUser",
      userID,
      { headers: { 'Content-Type': 'application/json' } }
    );
  } 
  catch (error: any) {
    console.log("User Profile | Logout: ", error.response?.data);
  }
};