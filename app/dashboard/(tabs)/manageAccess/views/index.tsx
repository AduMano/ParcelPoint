// Components
import { Text, View } from "@/components/Themed";
import MemberGestureItem from "@/app/utilities/manageAccess/components/MemberGestureItem";

// Library
import React, { useState, useCallback, useRef, useEffect } from "react";
import { ActivityIndicator, Alert, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Portal } from "react-native-paper";

// Types
import { IMember } from "@/app/utilities/manageAccess/types/types";

// Styles
import { styles, manageAccessStyle } from "@/app/utilities/manageAccess/style/style";
import { text } from "@/app/utilities/home/styles/styles";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";

// Atoms
import { memberList as AMemberList, userID as AUID, userList as AUserList } from "../../../../utilities/home/atoms/atom";
import { selectedMembers as ASelectedMembers, selectAllTrigger as ASelectAllTrigger } from "@/app/utilities/manageAccess/atoms/atom";

// Hooks
import useUpdateMember from "@/app/utilities/manageAccess/hooks/useUpdateMember";
import useDeleteMember from "@/app/utilities/manageAccess/hooks/useDeleteMember";

// COntent
import Colors from "@/constants/Colors";

const index = () => {
  /// Constants
  const router = useRouter();

  /// Custom Hooks Api
  const { updateMember, isLoading: UMLoading, data: UMData, error: UMError } = useUpdateMember();
  const { deleteMember, isLoading: DMLoading, data: DMData, error: DMError } = useDeleteMember();

  /// States
  const [members, setMembers] = useRecoilState(AMemberList);
  const [selectedMembers, setSelectedMembers] = useRecoilState(ASelectedMembers);
  const [_, setSelectAllTriggerState] = useRecoilState(ASelectAllTrigger);
  const [isLoading, setLoading] = useState<boolean>(false);
  const userID = useRecoilValue(AUID);
  const [userList, setUserList] = useRecoilState(AUserList);

  /// Handlers
  const handleSelectAllMembers = () => {
    const flag = selectedMembers.length === 0 ? true : false;
    setSelectAllTriggerState(flag);

    if (!flag) setSelectedMembers([]);
  };

  const renderMemberItems = useCallback(({item}: {item: IMember}) => (
    <MemberGestureItem 
      item={item} 
    />
  ), [members]);

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
    Alert.alert("Notice:", `Are you sure you want to remove this/these members?`, [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          setLoading(true);

          const data = selectedMembers.map((member) => { return member.id ?? "" });

          try {
            await deleteMember({
              Members: data,
              GroupOwnerId: userID ?? "",
            });
          }
          catch (error) {
            console.log(error);
          }
          finally {
            setLoading(false);
          }
        },
      },
    ]);
  }, [selectedMembers]);

  const handleModifyMemberAuthorizationAction = useCallback(async (isAdding: boolean) => {
    Alert.alert("Confirm", `Are you sure you want to ${isAdding ? "add" : "remove"} authorization to this/these members?`, [
      { text: "No" }, { text: "Yes", onPress: async () => {
        setLoading(true);

        const data = selectedMembers.map((member) => {
          return {
            GroupMemberId: member.groupMemberId,
            IsAuthorized: isAdding,
            RelationshipId: member.relationship?.id,
            GroupOwnerId: userID ?? "",
          };
        });

        try {
          await updateMember(data); // Call the backend to update member authorization
          if (UMError === null) {
            setMembers((current) =>
              current.map((member) => {
                if (selectedMembers.map(mem => mem.id).includes(member.id + "")) {
                  return { ...member, isAuthorized: isAdding };
                }
                return { ...member };
              })
            );
            Alert.alert("Success", "Member/s Successfully " + (isAdding ? "Authorized":"Un Authorized"));
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }}
    ]);
  },
  [selectedMembers]);

  // UseEffect
  useEffect(() => {
    if (DMData === null) return;

    setMembers((current) =>
      current.filter((member) => !selectedMembers.map(mem => mem.id).includes(member.id + ""))
    );

    // Add them to the user list so we can add them again
    selectedMembers.map((member) => setUserList((current) => [...current, member]));

    setSelectedMembers([]);

    Alert.alert("Success", "Member/s Successfully Removed");
  }, [DMData]);

  useEffect(() => {
    if (UMError === null) return;

    Alert.alert("Oops!", UMError, [{ text: "I Understand", onPress: () => setLoading(false) }]);
  }, [UMError]);

  useEffect(() => {
    if (DMError === null) return;
    Alert.alert("Oops!", DMError, [{ text: "I Understand", onPress: () => setLoading(false) }]);
  }, [DMError]);

  return (
    <>
      {/* Modal */}
      <Portal>
        {/* Loading Screen */}
        { isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={100} color={Colors["light"].buttonAction} />
          </View>
        )}
      </Portal>

      {/* Content */}
      <View style={[styles.container]}>
        {/* Header */}
        <View style={manageAccessStyle.header}>
          <Text style={manageAccessStyle.headerTitle}>Manage Member Access</Text>
        </View>

        {/* Body */}
        <View style={{backgroundColor: "transparent", flex: 1}}>
          {/* Member List */}
          <View style={manageAccessStyle.memberList}>
            {/* Header */}
            <View style={[manageAccessStyle.memberHeader, {backgroundColor: "transparent", marginBottom: 10}]}>
              <Text>
                <Text style={text.headingTwo}>Household Members {'\n'}</Text>
                <Text style={text.subHeading}>(Swipe Left to Edit)</Text>
              </Text>

              <TouchableOpacity 
                onPress={handleSelectAllMembers} 
              >
                <Text>{selectedMembers.length === 0 ? "Select All" : "De-Select All"}</Text>
              </TouchableOpacity>
            </View>

            {/* FlatList */}
            <FlatList 
              data={members}
              keyExtractor={(item) => item.id+"|"+Math.random()}
              renderItem={renderMemberItems}
              contentContainerStyle={{
                width: "100%",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
              ListEmptyComponent={(
                <View style={{backgroundColor: "transparent", width: "80%"}}>
                  <Text style={[text.bold, text.center, text.heading, text.mute, {marginVertical: 20,}]}>You currently don't share access with other users.</Text>
                </View>
              )}
            />
          </View>

          {/* Actions */}
          <View style={[manageAccessStyle.memberAction]}>

            <View style={manageAccessStyle.formGroup}>
              <TouchableOpacity 
                style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormHalf, manageAccessStyle.btnDanger, {
                  filter: selectedMembers.length > 0 ?  "contrast(100%)" : "contrast(50%)",
                }]}
                onPress={handleRemoveMemberAction}
                disabled={selectedMembers.length > 0 ? false : true}
              >
                <Text style={[text.bold, text.white]}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormHalf, manageAccessStyle.btnSecondary]}
                onPress={() => {
                  router.navigate({
                    pathname: "/utilities/manageAccess/forms/MemberForm",
                    params: {
                      "type": "add"
                    }
                  });
                }}
              >
                <Text style={text.bold}>Add Member</Text>
              </TouchableOpacity>
            </View>
              
            <TouchableOpacity 
              style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormFull, manageAccessStyle.btnSecondary, {
                filter: selectedMembers.length > 0 ?  "contrast(100%)" : "contrast(50%)",
              }]}
              onPress={() => handleModifyMemberAuthorizationAction(false)}
              disabled={selectedMembers.length > 0 ? false : true}
            >
              <Text style={text.bold}>Remove Authorization</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormFull, manageAccessStyle.btnPrimary, {
                filter: selectedMembers.length > 0 ?  "contrast(100%)" : "contrast(50%)",
              }]}
              onPress={() => handleModifyMemberAuthorizationAction(true)}
              disabled={selectedMembers.length > 0 ? false : true}
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
