// Components
import { Text, View } from "@/components/Themed";
import MemberItem from "@/app/utilities/manageAccess/components/MemberItem";

// Helper
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FlatList, TouchableOpacity } from "react-native";

// Types
import { TMember } from "@/app/utilities/home/types/type";

// Styles
import { styles, manageAccessStyle } from "@/app/utilities/manageAccess/style/style";
import { text } from "@/app/utilities/home/styles/styles";
import { notificationStyle } from "@/app/utilities/notification/styles/styles";

const index = () => {
  /// States
  const members = useMemo<TMember[]>(
    () => [
      { id: "1", name: "DanDan", image: "icon.png" },
      { id: "2", name: "DenDen", image: "icon.png" },
      { id: "3", name: "DinDin", image: "icon.png" },
      { id: "4", name: "DonDon", image: "icon.png" },
      { id: "5", name: "DunDun", image: "icon.png" },
      { id: "6", name: "Shane", image: "icon.png" },
      { id: "7", name: "Juvit", image: "icon.png" },
      { id: "8", name: "Ferdinand", image: "icon.png" },
    ],
    []
  );

  /// Handlers

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
            {/* Header */}
            <View style={manageAccessStyle.memberHeader}>
              <Text style={text.headingTwo}>Household Members</Text>

              <TouchableOpacity>
                <Text>Select All</Text>
              </TouchableOpacity>
            </View>

            {/* FlatList */}
            <FlatList 
              data={members}
              keyExtractor={(item) => item.id}
              renderItem={({item}: {item: TMember}) => (
                <MemberItem member={item} />
              )}
              contentContainerStyle={notificationStyle.list}
            />
          </View>

          {/* Action */}
          <View>

          </View>
        </View>
      </View>
    </>
  );
};

export default index;
