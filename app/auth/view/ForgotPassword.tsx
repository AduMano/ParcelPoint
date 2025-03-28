// Components
import { View, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";

// Library
import { LinearGradient } from "expo-linear-gradient";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { useCallback, useEffect, useState } from "react";
import { StatusBar, Image, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator, Portal } from "react-native-paper";

// Forms
import ResetPassword from "../forms/ResetPassword";
import CodeRequest from "../forms/CodeRequest";

const ForgotPassword = () => {
  // Phase State
  const [isVerified, setVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [headerText, setHeaderText] = useState<string>("");
  const [subText, setSubText] = useState<string>("");

  // Set Navigation Style
  useEffect(() => {
    setBackgroundColorAsync(Colors["light"].backgroundGray);
    setButtonStyleAsync("dark");
  }, []);

  // When Phase State changes
  useEffect(() => {
    if (isVerified) {
      setHeaderText("CHANGE YOUR \nPASSWORD");
      setSubText("Verified! You may now enter your new password!");
      return;
    }

    setHeaderText("USER \nVERIFICATION");
    setSubText("Enter your email to get Verification Code");
  }, [isVerified]);

  // Handle Loader
  const handleLoader = useCallback( (state: boolean) => {
    setLoading(state);
  }, [setLoading]);

  return (
    <>
      {/* Modals */}
      <Portal>
        {/* Loading Screen */}
        { isLoading && (
          <View style={[styles.loading, {gap: 20}]}>
            <ActivityIndicator size={100} color={Colors["light"].buttonAction} />
          </View>
        )}
      </Portal>

      {/* Content */}
      <View style={styles.container}>
        {/* Status Bar */}
        <StatusBar
          backgroundColor="#32A4DB00"
          translucent={true}
          barStyle={"light-content"}
        />

        {/* Header Section */}
        <View style={styles.viewHeader}>
          <LinearGradient
            colors={[
              Colors["light"].backgroundDark,
              Colors["light"].backgroundDark,
            ]}
            style={styles.gradient}
          ></LinearGradient>

          <Image
            source={require("@/assets/images/auth/3dLock.png")} // Replace with your local image
            style={styles.headerImage}
          />

          <Text style={styles.header}>
            <Text style={{ fontWeight: "bold" }}>{headerText}</Text>
          </Text>
          <Text style={styles.subText}>{subText}</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          {isVerified ? (
            <ResetPassword styles={styles} setLoading={handleLoader} email={email} />
          ) : (
            <CodeRequest styles={styles} setVerified={setVerified} setLoading={handleLoader} email={email} setEmail={setEmail} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Containers
  container: {
    position: "relative",
    width: "100%",
    height: "100%",

    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",

    fontFamily: "Roboto",
  },
  viewHeader: {
    position: "relative",
    width: "100%",
    top: 0,
  },
  form: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  // Component
  loading: {
    position: "absolute", 
    top: 0, left: 0, 
    width: "100%", 
    height: "100%", 
    flex: 1, 
    backgroundColor: "#ffffff", 
    justifyContent: "center", 
    alignItems: "center",
    zIndex: 9999, 
  },

  header: {
    fontSize: 26,
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  subText: {
    textAlign: "center",
    marginTop: 10,
    color: Colors.light["textMute"],
  },
  headerImage: {
    position: "relative",
    top: "50%",
    left: "50%",
    width: 270,
    height: 270,
    resizeMode: "contain",
    transform: [{ translateX: "-50%" }, { translateY: "-70%" }],
  },

  label: {
    width: "86%",
    margin: "auto",
    fontSize: 16,
    color: "#333",
  },
  textField: {
    width: "86%",
    margin: "auto",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  submit: {
    backgroundColor: Colors["light"].buttonAction,
    width: "86%",
    marginHorizontal: "auto",
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
  },
  submitText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  gradient: {
    position: "absolute",
    top: -260, left: "50%",
    width: "250%",
    height: 400,

    backgroundColor: Colors["light"].backgroundDark,

    transform: [{translateX: "-50%"}, { rotate: '-20deg' }],
    transformOrigin: "center center",
    zIndex: 0,
  },
});

export default ForgotPassword;
