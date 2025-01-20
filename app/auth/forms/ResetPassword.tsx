// Components
import PasswordField from "@/components/PasswordField";
import { Text } from "@/components/Themed";

// Library
import { Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import React from "react";

const ResetPassword = (props: { styles: any }) => {
  // Prop Drilling
  const { styles } = props;

  // Init
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Functions
  const handleSubmit = () => {
    // Validation
    if (newPassword.trim() == "" || confirmPassword.trim() == "") {
      // Display toast or pop up component that fields cannot be empty
      Alert.alert("Invalid", "Input Fields cannot be empty.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    if (newPassword.trim().length < 8) {
      // Display toast or pop up component that username must be atleast 2 characters
      Alert.alert("Invalid", "Password must be at least 8 characters.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    if (confirmPassword.trim() != newPassword) {
      // Display toast or pop up component that Pin Code be atleast 6 characters
      Alert.alert("Invalid", "Password doesn't match.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    // Apply Changes

    // Display Password has been changed

    // Go back to login
    Alert.alert("Success", "You have successfully changed your password", [
      {
        text: "Okay",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <>
      {/* Password Field */}
      <Text style={styles.label}>New Password</Text>
      <PasswordField
        password={newPassword}
        setPassword={setNewPassword}
        canToggleVisibility={true}
        style={styles.textField}
      />

      {/* Password Field */}
      <Text style={styles.label}>Confirm Password</Text>
      <PasswordField
        password={confirmPassword}
        setPassword={setConfirmPassword}
        canToggleVisibility={true}
        style={styles.textField}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Change Password</Text>
      </TouchableOpacity>
    </>
  );
};

export default ResetPassword;
