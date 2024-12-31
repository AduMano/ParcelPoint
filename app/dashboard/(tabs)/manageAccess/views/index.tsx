// Components
import { Text, View } from "@/components/Themed";
import MemberItem from "@/app/utilities/manageAccess/components/MemberItem";

// Helper
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

// Types
import { IMember } from "@/app/utilities/manageAccess/types/types";

// Styles
import { styles, manageAccessStyle } from "@/app/utilities/manageAccess/style/style";
import { text } from "@/app/utilities/home/styles/styles";

const index = () => {
  /// States
  const [members, setMembers] = useState<IMember[]>(
    [
      { id: "1", firstName: "Dan", lastName: "Dan", image: "icon.png", relationship: "Brother", isAuthorized: "Authorized" },
      { id: "2", firstName: "Den", lastName: "Den", image: "icon.png", relationship: "Friend", isAuthorized: "Not Authorized" },
      { id: "3", firstName: "Din", lastName: "Din", image: "icon.png", relationship: "Cousin", isAuthorized: "Authorized" },
      { id: "4", firstName: "Don", lastName: "Don", image: "icon.png", relationship: "Father", isAuthorized: "Authorized" },
      { id: "5", firstName: "Dun", lastName: "Dun", image: "icon.png", relationship: "Mother", isAuthorized: "Not Authorized" },
      { id: "6", firstName: "Shane", lastName: "Smith", image: "icon.png", relationship: "Friend", isAuthorized: "Authorized" },
      { id: "7", firstName: "Juvit", lastName: "Jones", image: "icon.png", relationship: "Aunt", isAuthorized: "Not Authorized" },
      { id: "8", firstName: "Ferdinand", lastName: "Fischer", image: "icon.png", relationship: "Uncle", isAuthorized: "Authorized" },
      { id: "9", firstName: "Lara", lastName: "Croft", image: "icon.png", relationship: "Sister", isAuthorized: "Authorized" },
      { id: "10", firstName: "Tony", lastName: "Stark", image: "icon.png", relationship: "Friend", isAuthorized: "Not Authorized" },
      { id: "11", firstName: "Clark", lastName: "Kent", image: "icon.png", relationship: "Brother", isAuthorized: "Authorized" },
      { id: "12", firstName: "Bruce", lastName: "Wayne", image: "icon.png", relationship: "Cousin", isAuthorized: "Not Authorized" },
      { id: "13", firstName: "Diana", lastName: "Prince", image: "icon.png", relationship: "Sister", isAuthorized: "Authorized" },
      { id: "14", firstName: "Steve", lastName: "Rogers", image: "icon.png", relationship: "Friend", isAuthorized: "Authorized" },
      { id: "15", firstName: "Natasha", lastName: "Romanoff", image: "icon.png", relationship: "Cousin", isAuthorized: "Not Authorized" },
      { id: "16", firstName: "Peter", lastName: "Parker", image: "icon.png", relationship: "Nephew", isAuthorized: "Authorized" },
      { id: "17", firstName: "Wanda", lastName: "Maximoff", image: "icon.png", relationship: "Sister", isAuthorized: "Not Authorized" },
      { id: "18", firstName: "Thor", lastName: "Odinson", image: "icon.png", relationship: "Brother", isAuthorized: "Authorized" },
      { id: "19", firstName: "Loki", lastName: "Laufeyson", image: "icon.png", relationship: "Cousin", isAuthorized: "Not Authorized" },
      { id: "20", firstName: "Pepper", lastName: "Potts", image: "icon.png", relationship: "Friend", isAuthorized: "Authorized" }
    ]
  );

  /// Handlers
  const renderMemberItems = useCallback(({item}: {item: IMember}) => (
    <GestureHandlerRootView style={manageAccessStyle.memberBody}>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity style={manageAccessStyle.actionEditButton}>
            <Text style={[{color: "white", textAlign: "center"}]}>Edit</Text>
          </TouchableOpacity>
        )}
        shouldCancelWhenOutside={true}
      >
        <MemberItem member={item} />
      </Swipeable>
    </GestureHandlerRootView>
  ), []);

  const handleSelectAllMembers = useCallback(() => {
  }, []);

  return (
    <>
      <View style={[styles.container]}>
        {/* Header */}
        <View style={manageAccessStyle.header}>
          <Text style={manageAccessStyle.headerTitle}>Manage Member Access</Text>
        </View>

        {/* Body */}
        <View style={{backgroundColor: "transparent"}}>
          {/* Member List */}
          <View style={manageAccessStyle.memberList}>
            {/* Header */}
            <View style={[manageAccessStyle.memberHeader, {backgroundColor: "transparent", marginBottom: 10}]}>
              <Text>
                <Text style={text.headingTwo}>Household Members {'\n'}</Text>
                <Text style={text.subHeading}>(Swipe Left to Edit)</Text>
              </Text>

              <TouchableOpacity onPress={handleSelectAllMembers}>
                <Text>Select All</Text>
              </TouchableOpacity>
            </View>

            {/* FlatList */}
            <FlatList 
              data={members}
              keyExtractor={(item) => item.id}
              renderItem={renderMemberItems}
              contentContainerStyle={{
                width: "100%",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default index;
