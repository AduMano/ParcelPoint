// Components
import Colors from "@/constants/Colors";

// Libraries
import { Tabs } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

// Helpers
import {
  EIconByName,
  FA6IconByName,
  FAIconByName,
} from "@/helpers/IconsLoader";

export default function ViewLayout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarIconStyle: {
            transform: "translateY(10px)",
          },
          tabBarStyle: {
            position: "relative",
            marginHorizontal: 12,
            marginVertical: 12,
            height: 60,
            borderRadius: 15,

            overflow: "hidden",
            backgroundColor: Colors.light["backgroundDark"],
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: Colors.light["buttonAction"],
        }}
      >
        {/* Home Screen */}
        <Tabs.Screen
          name="(tabs)/home/views/index"
          options={{
            tabBarShowLabel: false,
            tabBarIconStyle: {
              transform: "translateY(10px)",
            },
            tabBarIcon: ({ color, size }) => (
              <EIconByName name="home" size={size} color={color} />
            ),
          }}
        />

        {/* Household Sharing */}
        <Tabs.Screen
          name="(tabs)/manageAccess/views/index"
          options={{
            tabBarShowLabel: false,
            tabBarIconStyle: {
              transform: "scale(0.9) translateY(10px)",
            },
            tabBarIcon: ({ color, size }) => (
              <FA6IconByName name="user-group" size={size} color={color} />
            ),
          }}
        />

        {/* Parcel Logs */}
        <Tabs.Screen
          name="(tabs)/history/views/index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <FAIconByName name="history" size={size} color={color} />
            ),
          }}
        />

        {/* User Profile */}
        <Tabs.Screen
          name="(tabs)/userProfile/views/index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <FAIconByName name="user" size={size} color={color} />
            ),
            tabBarStyle: {
              display: "none"
            },
            animation: "shift",
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
