// Components
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";

// Helpers
import { validate_email } from "@/helpers/InputValidator";

// Library
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useMemo, useState } from "react";

const CodeRequest = (props: {
  btnText: string;
  email: string;
  setEmail: (text: string) => void;
  style?: any;
}) => {
  // Drilled Prop
  const { email, setEmail, btnText } = props;

  // State
  const [isCodeSent, setCodeSent] = useState<boolean>(false);
  const timer = useMemo(() => 120000, []); // In Milis
  const [remainingTime, setRemainingTime] = useState<number>(timer / 1000);

  useEffect(() => {
    if (!isCodeSent) return;

    const intervalId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCodeSent]);

  useEffect(() => {
    if (remainingTime < 1) {
      setCodeSent(false);
      setRemainingTime(timer / 1000);
    }
  }, [remainingTime]);

  // Functions
  const sendRequestViaEmail = () => {
    // Validate Email
    const email_input = validate_email(email);

    if (!email_input.status) {
      Alert.alert(email_input.title, email_input.message, [
        {
          text: "Okay",
          isPreferred: true,
        },
      ]);

      return;
    }

    Alert.alert(
      "Code Sent",
      "Please copy the 6-digit pin code thats been sent to your email.",
      [
        {
          text: "Okay",
          isPreferred: true,
          onPress: () => {
            setCodeSent(true);
          },
        },
      ]
    );
    // Generates a new code in the database
    // Send the Code
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {
          position: "relative",
          width: props.style.width,
          margin: "auto",
          marginBottom: props.style.marginBottom,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          textContentType="emailAddress"
          multiline={false}
          numberOfLines={1}
          style={[
            {
              ...props.style,
              position: "relative",
              flex: 2,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              marginBottom: 0,
            },
          ]}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        {/* Send Button */}
        <TouchableOpacity
          onPress={sendRequestViaEmail}
          style={[
            styles.button,
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: props.style.borderRadius,
              borderBottomRightRadius: props.style.borderRadius,
              borderColor: props.style.borderColor,
              borderWidth: props.style.borderWidth,

              backgroundColor: !isCodeSent
                ? Colors.light["buttonAction"]
                : "#aaaaaa",
            },
          ]}
          disabled={isCodeSent}
        >
          <Text style={{ textAlign: "center" }}>
            {!isCodeSent ? btnText : remainingTime + "s"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative", // Needed for absolute positioning of the eye icon
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  button: {
    position: "relative",
    textAlign: "center",
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
});

export default CodeRequest;
