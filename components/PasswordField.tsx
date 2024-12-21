import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Correct import

const PasswordField = (props: {
  password: string;
  setPassword: (text: string) => void;
  canToggleVisibility?: boolean;
  style?: any;
}) => {
  // Drilled Prop
  const { password, setPassword, canToggleVisibility } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // Functions
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle visibility state
  };

  return (
    <View style={[styles.inputContainer]}>
      <View
        style={{
          position: "relative",
          width: props.style.width,
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",

          // For Debugging
          // borderColor: "red",
          // borderWidth: 2,
        }}
      >
        <TextInput
          numberOfLines={1}
          style={[
            props.style,
            {
              width: "100%",
            },
          ]}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!isPasswordVisible}
        />

        {/* Eye Icon */}
        {canToggleVisibility && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={[styles.eye, {}]}
          >
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
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
  eye: {
    position: "absolute",
    right: 0, // Position eye icon to the right of the input
    top: "50%",
    transform: [{ translateY: -20 }, { translateX: -10 }], // Center the icon vertically
  },
});

export default PasswordField;
