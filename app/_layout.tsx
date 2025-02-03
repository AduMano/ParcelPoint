// MISC
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Library
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { RecoilRoot } from "recoil";

// Helper
import { checkIfItemExists } from "@/helpers/LocalStorageHelper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [justLoaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const hasItem = await checkIfItemExists("USER_ID");
      setIsAuthenticated(hasItem);
    }

    checkIfAuthenticated();
  }, []);

  useEffect(() => {
    if (!justLoaded) return;

    if (isAuthenticated) router.replace("/dashboard/(tabs)/home/views");
    else router.replace("/auth/view/LoginAuth");
  }, [isAuthenticated]);

  useEffect(() => setLoaded(true), []);

  return (
    <RecoilRoot> 
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="utilities/notification/view/index" options={{
          animation: "slide_from_right",
        }} /> 
        <Stack.Screen name="utilities/manageAccess/forms/MemberForm" options={{
          animation: "slide_from_right",
        }} /> 
      </Stack>
    </RecoilRoot>
  );
}
