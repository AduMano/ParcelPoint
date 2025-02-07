
// Actions
import { LogoutUserAction } from "@/actions/userProfile/LogoutUserAction";

const useLogoutUser = () => {

  const logoutUser = async (userID: string) => {
    await LogoutUserAction(userID);
  }

  return { logoutUser }
}

export default useLogoutUser;