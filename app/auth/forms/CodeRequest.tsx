// Components
import EmailFieldRequestCode from "@/components/EmailFieldRequestCode";
import { Text, View } from "@/components/Themed";

// Library
import { Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// Hooks
import useVerifyCode from "../hooks/useVerifyCode";

// Atoms
import { Code6 } from "@/app/auth/atoms/atom";
import { TextInput } from "react-native-paper";


const CodeRequest = (props: {
  styles: any;
  setVerified: (value: boolean) => void;
  setLoading: (state: boolean) => void;
  email: string;
  setEmail: (text: string) => void;
}) => {
  // Prop Drilling
  const { styles, setVerified, setLoading, email, setEmail } = props;

  // Init
  const [pinCode, setPinCode] = useState<string>("");

  // Recoil
  const CODE = useRecoilValue(Code6);

  // Hooks
  const { verifyCode, data: VCData, isLoading: VCLoading, error: VCError } = useVerifyCode();

  // Functions
  const handleSubmit = async () => {
    // Validation
    if (email.trim() == "" || pinCode.trim() == "") {
      // Display toast or pop up component that fields cannot be empty
      Alert.alert("Invalid", "Input Fields cannot be empty.", [
        { text: "I Understand" },
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

    await verifyCode(email, pinCode);
  };

  // Check if Verified
  useEffect(() => {
    if (VCData === null) return;
    else if (!VCData) {
      Alert.alert("Invalid", "Code is Invalid. Please try again.");
      return;
    } 
    else {
      setVerified(true);
    }
    
  }, [VCData]);

  // Loaders
  useEffect(() => {
    setLoading(VCLoading);
  }, [VCLoading]);

  return (
    <View style={{ justifyContent: "flex-start", width: "100%", gap: 20, }}>
      {/* E-Mail Field */}
      <View>
        <Text style={styles.label}>Email</Text>
        <EmailFieldRequestCode
          btnText="Send Code"
          email={email}
          setEmail={setEmail}
          style={styles.textField}
          setLoading={setLoading}
        />
      </View>

      {/* 6 Digit Field */}
      <View>
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
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CodeRequest;
