// Components
import { Text, View } from "@/components/Themed";

// Helper
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router"; 

// Styles
import { styles, manageAccessStyle } from "@/app/utilities/manageAccess/style/style";
import { text } from "@/app/utilities/home/styles/styles";

const index = () => {
  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={manageAccessStyle.header}>
          <Text style={manageAccessStyle.headerTitle}>Manage Member Access</Text>
        </View>

        {/* Body */}
        <View>
          {/* Member List */}
          <View style={manageAccessStyle.memberList}>
            <View style={manageAccessStyle.memberHeader}>
              <Text style={text.headingTwo}>Household Members</Text>

              <TouchableOpacity>
                <Text>Select All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action */}
        </View>
      </View>
    </>
  );
};

export default index;
