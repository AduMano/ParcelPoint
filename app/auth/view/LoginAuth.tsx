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
import { ActivityIndicator } from "react-native-paper";

// Hooks
import useLoginUser from "../hooks/useLoginUser";

// Helpers
import { isNotEmpty, minLength, validateInput } from "@/helpers/InputValidator";

const index = () => {
  // Init
  const router = useRouter();
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // Login Module
  const { login, data, isLoading, error } = useLoginUser();

  // Set Navigation Style
  useEffect(() => {
    setBackgroundColorAsync(Colors["light"].backgroundGray);
    setButtonStyleAsync("dark");
  }, []);

  // Functions
  const handleSubmit = async () => {
    /// Validation
    const usernameValidation = validateInput(username, [isNotEmpty, minLength(2)]);
    const passwordValidation = validateInput(password, [isNotEmpty, minLength(8)]);

    if (usernameValidation) {
      showAlert("Invalid", usernameValidation);
      return;
    }

    if (passwordValidation) {
      showAlert("Invalid", passwordValidation);
      return;
    }

    const cred = { username, password };

    try {
      await login(cred);
    } 
    catch (error) {
      console.error("Login error:", error);
      showAlert("Oops!", "An unexpected error occurred. Please try again later.");
    }
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: "I Understand", style: "default" }]);
  };
  
  const handleLoginError = (error: string) => {
    const lowerError = error.toLowerCase();
  
    if (lowerError === "invalid type. must be 'admin' or 'user'.") {
      showAlert("Oops!", "Invalid Request.");
    } else if (lowerError.includes("error retrieving user")) {
      showAlert("Oops!", "There seems to be an error. Please try again later.");
    } else if (lowerError === "user not found.") {
      showAlert("Invalid Credentials", "Invalid Username or Password. Please try again.");
    } else {
      showAlert("Oops!", "An error occurred. Please try again later.");
    }
  };
  
  const handleLoginSuccess = (username: string) => {
    Alert.alert("Success", `You have successfully logged in, ${username}!`, [
      {
        text: "Okay",
        style: "default",
        onPress: () => router.replace("/dashboard/(tabs)/home/views"),
      },
    ]);
  };

  useEffect(() => {
    if (data) { handleLoginSuccess(data.username); } 
    else if (error) { 
      handleLoginError(error); 
    }
  }, [data, error]);

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
        <TouchableOpacity 
          style={[styles.loginButton, {
            filter: isLoading ? "contrast(60%) saturate(0)" : "contrast(100%) saturate(1)",
          }]} 
          disabled={isLoading}
          onPress={handleSubmit}
        >
          <View style={{backgroundColor: "transparent"}}>
            { isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            
          </View>
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
    flex: 1,

    justifyContent: "flex-start",
    alignItems: "center",
    gap: 40,

    fontFamily: "Roboto",
  },
  viewHeader: {
    position: "relative",
    width: "100%",
    height: "55%",
    top: 0,
  },
  form: {
    position: "relative",
    width: "100%",
    // flex: 1,
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
    marginBottom: 20,
  },
  headerImage: {
    position: "relative",
    marginHorizontal: "auto",
    resizeMode: "cover",
    transform: [{ scale: 0.9 }],
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
    marginBottom: 10,
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
    position: "absolute",
    top: 0, left: 0,
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
