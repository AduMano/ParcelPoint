// Components
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import PasswordField from "@/components/PasswordField";

// Library
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

// Hooks
import useGetUser from "../hooks/useGetUser";

const index = () => {
  // Init
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Login Module
  const { data, loading, getUser } = useGetUser();

  // Set Navigation Style
  useEffect(() => {
    setBackgroundColorAsync(Colors["light"].backgroundGray);
    setButtonStyleAsync("dark");
  }, []);

  // Functions
  const handleSubmit = async () => {
    // Validation
    if (username.trim() == "" || password.trim() == "") {
      // Display toast or pop up component that fields cannot be empty
      Alert.alert("Invalid", "Input Fields cannot be empty.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    if (username.trim().length < 2) {
      // Display toast or pop up component that username must be atleast 2 characters
      Alert.alert("Invalid", "Username must contain at least 2 characters.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    if (password.trim().length < 8) {
      // Display toast or pop up component that passwor dmust be atleast 8 characters
      Alert.alert("Invalid", "Password must contain at least 8 characters.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    // POST Request pass the username and password to the API to check if authentication is true
    // If not true, display toast or pop up component
    // else, ROUTER: GO TO HOME PAGE.
    Alert.alert(
      "Success",
      "You have successfully Logged In! \nPress okay to continue.",
      [
        {
          text: "Okay",
          style: "default",
          onPress: () => {
            router.replace("/dashboard/(tabs)/home/views");
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container]}>
      {/* Status Bar */}
      <StatusBar
        backgroundColor="#32A4DB00"
        translucent={true}
        barStyle={"light-content"}
      />

      {/* Header Section */}
      <View style={styles.viewHeader}>
        <LinearGradient
          colors={["#32A4DB", Colors["light"].backgroundDark]}
          style={styles.gradient}
        ></LinearGradient>

        <Image
          source={require("@/assets/images/auth/3dRider.png")} // Replace with your local image
          style={styles.headerImage}
        />

        <Text style={styles.header}>
          <Text style={{ fontWeight: "bold" }}>Welcome to Parcel</Text>Point!
        </Text>
        <Text style={styles.subHeader}>
          Keeping your parcels safe and secure
        </Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* Username Field */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          numberOfLines={1}
          style={styles.textField}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        {/* Password Field */}
        <Text style={styles.label}>Password</Text>
        <PasswordField
          password={password}
          setPassword={setPassword}
          canToggleVisibility={true}
          style={styles.textField}
        />

        {/* Forgot Password Link */}
        <TouchableOpacity
          onPress={() => router.push("/auth/view/ForgotPassword")}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Containers
  container: {
    position: "relative",
    width: "100%",
    height: "100%",

    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",

    fontFamily: "Roboto",
  },
  viewHeader: {
    position: "relative",
    width: "100%",
    height: "60%",
    top: 0,

    // borderColor: "red",
    // borderWidth: 1,
  },
  form: {
    position: "relative",
    width: "100%",
    height: "37%",

    // borderWidth: 1,
    // backgroundColor: "#00000000",
  },

  // Components
  header: {
    fontSize: 26,
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 0,
  },
  headerImage: {
    position: "absolute",
    top: 20,
    left: "50%",
    width: 400,
    height: 400,
    resizeMode: "contain",
    transform: [{ translateX: "-50%" }],
  },

  label: {
    width: "86%",
    marginHorizontal: "auto",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  textField: {
    width: "86%",
    marginHorizontal: "auto",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    width: "86%",
    margin: "auto",
    color: "gray",
    textAlign: "right",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: Colors["light"].buttonAction,
    width: "86%",
    margin: "auto",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
  },
  loginButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  gradient: {
    width: "120%",
    height: "70%",
    marginBottom: 40,
    overflow: "hidden",
    transform: [
      { skewY: "-10deg" },
      { skewX: "20deg" },
      { translateY: -40 },
      { translateX: -20 },
      { scale: 1.1 },
    ],
  },
});

export default index;
