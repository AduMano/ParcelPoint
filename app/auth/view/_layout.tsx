import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import useGetApiUrl from "@/app/utilities/home/hooks/useGetApiUrl";
import { useRecoilState } from "recoil";
import { API_URL as AAPIURL } from "@/app/utilities/home/atoms/atom";

export default function ViewLayout() {
  const [loading, setLoading] = useState<boolean>(false);
  const {fetchAPIUrl, isLoading: AULoading, data, error} = useGetApiUrl();
  const [API_URL, setAPI_URL] = useRecoilState(AAPIURL);

  // Loaders
  useEffect(() => {
    setLoading(AULoading);
  }, [AULoading]);

  useEffect(() => {
    const getAPI = async () => {
      await fetchAPIUrl();
    }

    getAPI();
  }, []);

  useEffect(() => {
    if (data === null) return;

    setAPI_URL(data);
  }, [data])

  return (
    <>
      {loading ? (<ActivityIndicator size="large" />) : (
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          {/* Login */}
          <Stack.Screen name="LoginAuth" />

          {/* Forgot Password */}
          <Stack.Screen
            name="ForgotPassword"
            options={{
              title: "",
              headerTintColor: "#ffffff",
              headerShown: true,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors["light"].backgroundDark,
              },
            }}
          />
        </Stack>
      )}
    </>
  );
}
