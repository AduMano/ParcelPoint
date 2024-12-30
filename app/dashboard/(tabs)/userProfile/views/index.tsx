// Components
import { Text, View } from "@/components/Themed";

// Helper
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router"; 

// Styles
import { styles, userProfileStyle } from "@/app/utilities/userProfile/style/style";

const index = () => {
  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={userProfileStyle.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={userProfileStyle.routerBack}
          >
            <FA6IconByName name="arrow-left" size={28} color={"white"} />
          </TouchableOpacity>

          <Text style={userProfileStyle.headerTitle}>User Profile</Text>
          
          <TouchableOpacity
            onPress={() => router.back()}
            style={userProfileStyle.editButton}
          >
            <FA6IconByName name="edit" size={28} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default index;
