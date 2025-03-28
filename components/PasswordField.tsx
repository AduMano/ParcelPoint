import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Correct import
import { TextInput } from "react-native-paper";

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
          marginHorizontal: "auto",
          marginVertical: 0, paddingVertical: 0,
          gap: 0,
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <TextInput
          numberOfLines={1}
          style={[
            props.style,
            {
              width: "100%",
              height: 44
            },
          ]}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!isPasswordVisible}
          contentStyle={{color: "black"}} 
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
    transform: [{ translateX: -10 }], // Center the icon vertically
  },
});

export default PasswordField;
