import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

export default function ViewLayout() {
  return (
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
  );
}
