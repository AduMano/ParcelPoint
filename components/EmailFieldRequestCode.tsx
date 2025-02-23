// Components
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";

// Helpers
import { isNotEmpty, isValidEmail, validateInput } from "@/helpers/InputValidator";

// Library
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

// Hooks
import useVerifyEmail from "@/app/auth/hooks/useVerifyEmail";
import useSendCode from "@/app/auth/hooks/useSendCode";

// Atoms
import { Code6 } from "@/app/auth/atoms/atom";
import { TextInput } from "react-native-paper";

const CodeRequest = (props: {
  btnText: string;
  email: string;
  setEmail: (text: string) => void;
  style?: any;
  setLoading: (state: boolean) => void;
}) => {
  // Drilled Prop
  const { email, setEmail, btnText, setLoading } = props;

  // State
  const [isCodeSent, setCodeSent] = useState<boolean>(false);
  const timer = useMemo(() => 120000, []); // In Milis
  const [remainingTime, setRemainingTime] = useState<number>(timer / 1000);
  const [_, setCode] = useRecoilState(Code6);

  // Hooks
  const { verifyEmail, data: VEData, isLoading: VELoading, error: VEError } = useVerifyEmail();
  const { sendCode, data: SCData, isLoading: SCLoading, error: SCError } = useSendCode();

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
  const sendRequestViaEmail = async () => {
    // Validate Email
    const validate_email = validateInput(email, [isNotEmpty, isValidEmail]);

    if (validate_email !== null) {
      Alert.alert("Invalid", validate_email, [ { text: "I Understand" } ]);
      return;
    }

    await verifyEmail(email);
  };

  // Verifying Email
  useEffect(() => {
    if (VEData === null) return;

    if (!VEData) {
      Alert.alert("Invalid", "The email you provided hasn't been registered yet.", [{text:"I Understand."}]);
      return;
    }
    else if (VEData) {
      const sendCodePin = async () => {
        // await 
        await sendCode(email);
      }

      sendCodePin();
    }

    Alert.alert("Code Sent", "Please copy the 6-digit pin code thats been sent to your email.\nPlease do check your spams as well only if you didn't see the email.",
      [{ text: "Okay", isPreferred: true, onPress: () => { setCodeSent(true) }}]
    );
  }, [VEData]);

  // Sending Code
  useEffect(() => {
    if (SCData === null) return;

    setCode(SCData);
    setCodeSent(true);
  }, [SCData]);

  // Loaders
  useEffect(() => {
    setLoading(VELoading || SCLoading);
  }, [VELoading, SCLoading]); 

  // Errors
  useEffect(() => {
    if (VEError === null) return;

    console.log(VEError);
  }, [VEError]);
  useEffect(() => {
    if (SCError === null) return;

    console.log(SCError);
  }, [SCError]);

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
