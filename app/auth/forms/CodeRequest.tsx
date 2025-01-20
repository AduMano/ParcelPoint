// Components
import EmailFieldRequestCode from "@/components/EmailFieldRequestCode";
import { Text } from "@/components/Themed";

// Library
import { Alert, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const CodeRequest = (props: {
  styles: any;
  setVerified: (value: boolean) => void;
}) => {
  // Prop Drilling
  const { styles, setVerified } = props;

  // Init
  const [email, setEmail] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");

  // Functions
  const handleSubmit = () => {
    // Validation
    if (email.trim() == "" || pinCode.trim() == "") {
      // Display toast or pop up component that fields cannot be empty
      Alert.alert("Invalid", "Input Fields cannot be empty.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    if (pinCode.trim().length < 6) {
      // Display toast or pop up component that Pin Code be atleast 6 characters
      Alert.alert("Invalid", "Pin Code must contain at least 6 characters.", [
        {
          text: "I Understand",
          isPreferred: true,
        },
      ]);
      return;
    }

    // Validate if Code is exact

    setVerified(true);
  };

  return (
    <>
      {/* E-Mail Field */}
      <Text style={styles.label}>E-mail</Text>
      <EmailFieldRequestCode
        btnText="Send Code"
        email={email}
        setEmail={setEmail}
        style={styles.textField}
      />

      {/* 6 Digit Field */}
      <Text style={styles.label}>6 Digit Code</Text>
      <TextInput
        keyboardType="number-pad"
        maxLength={6}
        numberOfLines={1}
        style={styles.textField}
        value={pinCode}
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, "");
          setPinCode(numericValue);
        }}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Verify Code</Text>
      </TouchableOpacity>
    </>
  );
};

export default CodeRequest;
