// Components
import { Text, View } from "@/components/Themed";

// Library
import React, { useState, useCallback } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// Types
import { IMember } from "@/app/utilities/manageAccess/types/types";

// Styles
import { styles, manageAccessStyle } from "@/app/utilities/manageAccess/style/style";
import { text } from "@/app/utilities/home/styles/styles";
import MemberGestureItem from "@/app/utilities/manageAccess/components/MemberGestureItem";

const index = () => {
  /// Constants
  const router = useRouter();
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
      { id: "10", firstName: "Tony", lastName: "Starks", image: "icon.png", relationship: "Friend", isAuthorized: "Not Authorized" },
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
  const [resetFlag, setResetFlag] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  /// Handlers
  const handleSelectAllMembers = useCallback(() => {
    setResetFlag((current) => !current);
  }, []);

  const handleAddSelectedMember = useCallback((id: string) => {
    setSelectedMembers((current) => {
      return[...current, id];
    });
  }, []);

  const handleRemoveSelectedMember = useCallback((val_id: string) => {
    setSelectedMembers((current) => {
      return current.filter(id => id != val_id);
    })
  }, []);

  const renderMemberItems = useCallback(({item}: {item: IMember}) => (
    <MemberGestureItem 
      item={item} 
      resetFlag={resetFlag} 
      addSelectedMember = {handleAddSelectedMember}
      removeSelectedMember = {handleRemoveSelectedMember}
    />
  ), [resetFlag]);

  const isSelectedMemberListEmpty = useCallback(() => {
    if (selectedMembers.length === 0) {
      Alert.alert(
        "No Selected Members",
        "Select members in order to perform this action."
      );
      return true;
    }
  }, [selectedMembers]);

  const handleRemoveMemberAction = useCallback(() => {
    // Check if there are no selected members
    if (isSelectedMemberListEmpty()) return;

    // Show confirmation alert
    Alert.alert("Notice:", `Are you sure you want to remove these members?`, [
      {
        text: "No", // Option to cancel the action
        onPress: () => {
          // Do nothing if the user cancels
          return;
        },
      },
      {
        text: "Yes", // Option to confirm the removal
        onPress: () => {
          // Update the members list, removing the selected members
          setMembers((current) =>
            current.filter((member) => !selectedMembers.includes(member.id))
          );
          setSelectedMembers([]);
        },
      },
    ]);
  }, [selectedMembers]);

  const handleModifyMemberAuthorizationAction = useCallback((action: string) => {
    // Check if there are no selected members
    if (isSelectedMemberListEmpty()) return;

    // Show confirmation alert
    Alert.alert("Notice:", `Are you sure you want to ${action} authorization from these members?`, [
      {
        text: "No", // Option to cancel the action
        onPress: () => {
          // Do nothing if the user cancels
          return;
        },
      },
      {
        text: "Yes", // Option to confirm the removal
        onPress: () => {
          // Update the members list, updating the isAuthorized from the selected members
          if (action === "add") {
            setMembers((current) =>
              current.map((member) => {
                if (selectedMembers.includes(member.id)) {
                  return {...member, isAuthorized: "Authorized"}
                }
                return {...member}
              })
            );
          }
          else if (action === "remove") {
            setMembers((current) =>
              current.map((member) => {
                if (selectedMembers.includes(member.id)) {
                  return {...member, isAuthorized: "Not Authorized"}
                }
                return {...member}
              })
            );
          }
        },
      },
    ]);
  }, [selectedMembers]);

  return (
    <>
      <View style={[styles.container]}>
        {/* Header */}
        <View style={manageAccessStyle.header}>
          <Text style={manageAccessStyle.headerTitle}>Manage Member Access</Text>
        </View>

        {/* Body */}
        <View style={{backgroundColor: "transparent", height: "44%"}}>
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
              ListEmptyComponent={(
                <View style={{backgroundColor: "transparent"}}>
                  <Text style={[text.bold, text.center, text.heading]}>No Member List.</Text>
                </View>
              )}
            />
          </View>

          {/* Actions */}
          <View style={[manageAccessStyle.memberAction]}>

            <View style={manageAccessStyle.formGroup}>
              <TouchableOpacity 
                style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormHalf, manageAccessStyle.btnDanger]}
                onPress={handleRemoveMemberAction}
              >
                <Text style={[text.bold, text.white]}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormHalf, manageAccessStyle.btnSecondary]}
                onPress={() => {
                  router.push({
                    pathname: "/utilities/manageAccess/forms/MemberForm",
                    params: {"type": "add"}
                  });
                }}
              >
                <Text style={text.bold}>Add Member</Text>
              </TouchableOpacity>
            </View>
              
            <TouchableOpacity 
              style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormFull, manageAccessStyle.btnSecondary]}
              onPress={() => handleModifyMemberAuthorizationAction("remove")}
            >
              <Text style={text.bold}>Remove Authorization</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormFull, manageAccessStyle.btnPrimary]}
              onPress={() => handleModifyMemberAuthorizationAction("add")}
            >
              <Text style={text.bold}>Authorize</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default index;
