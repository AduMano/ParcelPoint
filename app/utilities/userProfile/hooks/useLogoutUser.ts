
// Actions
import { LogoutUserAction } from "@/actions/userProfile/LogoutUserAction";

// Hooks
import { useRecoilValue } from "recoil";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";

const useLogoutUser = () => {
  const API_URL = useRecoilValue(AAPIURL);

  const logoutUser = async (userID: string) => {
    await LogoutUserAction(userID, API_URL ?? "");
  }

  return { logoutUser }
}

export default useLogoutUser;