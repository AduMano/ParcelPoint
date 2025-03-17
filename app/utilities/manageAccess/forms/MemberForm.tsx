// Components 
import { Text, View } from '@/components/Themed';
import { LabeledTextInput } from '@/components/LabeledTextInput';

// Library
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PaperProvider, Portal, Searchbar, TextInput, Menu, Button, RadioButton, ActivityIndicator } from 'react-native-paper';
import { TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';

// Styles
import { styles, manageAccessStyle } from '../style/style';
import { text } from '../../home/styles/styles';

// Helpers
import { FA6IconByName } from '@/helpers/IconsLoader';
import { shortenText } from '@/helpers/textFormatter';

// Constants
import Colors from '@/constants/Colors';

// Types
import { IUpdateMemberRequest, IUserGroupMember, IUserRelationship } from '../types/types';

// Atoms
import { 
  userRelationship as AUserRelationship,
  selectedMember as ASelectedMember,
} from "../atoms/atom";
import { memberList as AMemberList, userList as AUserList, memberList, userID as AUserID } from "@/app/utilities/home/atoms/atom";

// Hooks
import useGetAllUserRelationships from '../hooks/useGetAllRelationships';
import useAddMember from '../hooks/useAddMember';
import useUpdateMember from '../hooks/useUpdateMember';

const MemberForm = () => {
  /// Global Hooks
  // Router
  const router = useRouter();
  const { type } = useLocalSearchParams();

  // Init Var
  const { 
    fetchUserRelationships: URFetch, 
    isLoading: URLoading, 
    data: URData, 
    error: URError
  } = useGetAllUserRelationships();

  const { addMember, isLoading: AMLoading, data: AMData, error: AMError } = useAddMember();
  const { updateMember, isLoading: UMLoading, data: UMData, error: UMError } = useUpdateMember();

  const [members, setMembers] = useRecoilState(AMemberList);
  const [selectedMember, setSelectedMember] = useRecoilState(ASelectedMember);
  const [options, setUserRelationships] = useRecoilState<IUserRelationship[]>(AUserRelationship);
  const [users, setUsers] = useRecoilState(AUserList);
  const [isLoading, setLoading] = useState<boolean>(false);

  // ID State
  const AUID = useRecoilValue(AUserID);
  const userID = useMemo(() => selectedMember?.id?.toString() || null, []);
  
  // Loader
  useEffect(() => {
    setLoading(AMLoading || UMLoading);
  }, [AMLoading, UMLoading]);

  // OnLoad
  useEffect(() => {
    // Set Relationships
    URFetch();
  }, [selectedMember]);

  // Load Fetched Datas
  useEffect(() => {
    if (URData === null) return;

    setUserRelationships(URData);
  }, [URData]);

  // Error Fetched Datas
  useEffect(() => {
    if (URError === null) return;

    Alert.alert("Error", URError, [{text: "I Understand"}]);
  }, [URError]);

  // Displaay States
  const [searchValue, setSearchValue] = useState<string>("");

  // Menu State
  const [submitBtnStatusDisabled, setSubmitButtonStatusDisabled] = useState<boolean>(true);
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);
  const [selectedRelationship, setRelationship] = useState<string>("");
  const [selectedRelationshipText, setRelationshipText] = useState<string | undefined>("Select Relationship");

  // Radio Button State
  const [selectedAuthorization, setAuthorization] = useState<boolean>(false);

  // Handlers 
  const handleSearchAction = useCallback(() => {
    const result = users?.find((member) => member.username === searchValue);

    // Guard Clause
    if (result === undefined || result === null) {
      setSelectedMember(null);
      Alert.alert("Notice", "No User Found. Make sure you typed it correctly or if the user really does exist.");
      return;
    }
    else if (members.map(member => member.username).includes(searchValue)) {
      setSearchValue("");
      setSelectedMember(null);
      Alert.alert("Notice", "The user you entered is already in your member list.");
      return;
    }

    setSelectedMember(result);
  }, [searchValue]);

  const handleSelectRelationship = (item: IUserRelationship) => {
    setRelationship(item.id); // Store value
    setRelationshipText(item.name); // Store value
    setMenuVisibility(false);
  };

  const handleSettingAuthorization = (status: boolean) => {
    setAuthorization(status);
  }

  // On Edit (Would be useEffect later)
  const [onLoad, setLoad] = useState<boolean>(false);

  // Edit Mode or Add Mode
  useEffect(() => {
    if (userID !== null && !onLoad) {
      setRelationshipText(selectedMember?.relationship?.name);
      setRelationship(() => options.find((relation) => relation.name === selectedMember?.relationship?.name)?.id || "");
      setAuthorization(selectedMember?.isAuthorized ?? false);
      setSubmitButtonStatusDisabled(false);
      setLoad(true);
    }
    else {
      setSelectedMember(null);
      setRelationshipText("Select Relationship");
      setRelationship("");
      setAuthorization(true);
      setSubmitButtonStatusDisabled(true);
      setLoad(true);
    }
  }, [userID, type])

  // On Edit Changes
  useEffect(() => {
    // Check if Authorization and Relationship matches with current selected user
    const getCurrentAuthorization = selectedAuthorization;
    const relationshipComparison = selectedMember?.relationship?.name === selectedRelationshipText;
    const authorizationComparison = selectedMember?.isAuthorized === getCurrentAuthorization;

    setSubmitButtonStatusDisabled((type === 'edit' && relationshipComparison && authorizationComparison) || 
    (type === "add" && selectedMember === null));

  }, [selectedRelationship, selectedAuthorization, selectedMember, type]);
  

  const handleSubmitForm = useCallback(() => {
    // Validation
    if (selectedMember === undefined) {
      Alert.alert("Notice", "Select a user in able to do this action")
      return;
    }
    else if (selectedRelationship === "") {
      Alert.alert("Notice", "Select a relationship in able to do this action");
      return;
    }

    // Confirmation
    Alert.alert("Notice", `Are you sure you want to ${type} this user?`, [
      { text: "No" },
      { text: "Yes", onPress: () => {
        // Submission
        switch(type) {
          case "add":
            handleAddMember({
              IsAuthorized: selectedAuthorization,
              MemberId: selectedMember?.id,
              RelationshipId: selectedRelationship
            }, AUID ?? "");
          break;
          
          case "edit":
            handleUpdateMember([{
              GroupMemberId: selectedMember?.groupMemberId,
              IsAuthorized: selectedAuthorization,
              RelationshipId: selectedRelationship,
              GroupOwnerId: AUID ?? "",
            }])
          break;
        }
      }}
    ]);
  }, [selectedMember, selectedAuthorization, selectedRelationship]);

  const handleAddMember = useCallback(async(creds: IUserGroupMember, USERID: string) => {
    await addMember(creds, USERID);
  }, []);

  const handleUpdateMember = useCallback(async(creds: IUpdateMemberRequest[]) => {
    await updateMember(creds);
  }, []);

  const handleCancelForm = useCallback(() => {
    // Check if theres any changes
    if ((type === "edit" && !submitBtnStatusDisabled) || (type === "add" &&  selectedMember !== null)) {
      handleConfirmExitDialog();
      return;
    }
    handleResetForm();
    router.back();

  }, [submitBtnStatusDisabled, selectedMember]); 

  const handleResetForm = useCallback(() => {
    setSelectedMember(null);
    setRelationshipText("Select Relationship");
    setRelationship("");
    setAuthorization(true);
    setSubmitButtonStatusDisabled(true);
  }, []);

  const handleConfirmExitDialog = useCallback(() => {
    Alert.alert("Notice", "Are you sure you want to cancel this form? Your progress will be discarded", [
      {text: "No"},
      {text: "Yes", onPress: () => router.back() }
    ]);
  }, []);

  /// UseEffect
  useEffect(() => {
    if (AMData === null) return;

    setMembers((current) => [...current, AMData]);
    handleResetForm();
    router.back();
  }, [AMData]);

  useEffect(() => {
    if (UMData === null) return;

    setMembers((current) =>
      current.map((member) => {
        if (selectedMember?.groupMemberId?.includes(member.id + "")) {
          return { 
            ...member, 
            isAuthorized: selectedAuthorization, 
            relationship: options.find(option => option.id === selectedRelationship) || undefined
          };
        }
        return { ...member };
      })
    );
    handleResetForm();
    router.back();
  }, [UMData]);

  // Errors
  useEffect(() => {
    if (AMError === null) return;
    
    console.log(AMError);
  }, [AMError])
  
  return (
    <PaperProvider>
      <>
        {/* Modals */}
        <Portal>
          {/* Loading Screen */}
          { isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator size={100} color={Colors["light"].buttonAction} />
            </View>
          )}
        </Portal>

        <View style={styles.container}>
          {/* Header */}
          <View style={manageAccessStyle.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={manageAccessStyle.routerBack}
            >
              <FA6IconByName name="arrow-left" size={28} color={"white"} />
            </TouchableOpacity>
            <Text style={manageAccessStyle.headerTitle}>{(type === "add") ? "Add" : "Edit"} Household Member</Text>
          </View>

          {/* Body */}
          <View style={[manageAccessStyle.view, manageAccessStyle.memberForm]}>
            {/* Search Bar for Add */}
          {
            (type === "add") && (
              <View style={[manageAccessStyle.view]}>
                <Searchbar 
                  value={searchValue} 
                  onChangeText={setSearchValue} 
                  onSubmitEditing={handleSearchAction}
                  placeholder='Search Username' 
                  style={{
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: "white",
                  }} 
                  inputStyle={{
                    minHeight: 0,
                    color: "black"
                  }}
                  onClearIconPress={() => setSelectedMember(null)}
                />
              </View>
            )
          }

            {/* User Profile */}
            <View style={[manageAccessStyle.view]}>
              <View style={[manageAccessStyle.view, manageAccessStyle.flexRow, manageAccessStyle.alignItemsEnd, {
                  marginVertical: 20,
                  gap: 20
                }]
              }>
                {/* Image */}
                <Image
                  source={(selectedMember !== null) ? require(`@/assets/images/icon.png`) : require(`@/assets/images/dashboard/homepage/package.png`)} // Replace with your local image
                  style={[manageAccessStyle.MemberImage]}
                />
                
                {/* Two Inputs User Info */}
                <View style={[manageAccessStyle.view, {flex: 1}]}>
                  <LabeledTextInput 
                    label='User ID'
                    textBoxStyle={manageAccessStyle.textInput}
                    value={(selectedMember !== null) ? shortenText(selectedMember?.id ?? "", 14) : ""}
                    viewStyle={manageAccessStyle.view}
                    readonly={true}
                    scrollable={true}
                  />
                  
                  <LabeledTextInput 
                    label='Username'
                    textBoxStyle={manageAccessStyle.textInput}
                    value={(selectedMember !== null) ? selectedMember?.username : ""}
                    viewStyle={manageAccessStyle.view}
                    readonly={true}
                  />
                </View>
              </View>
              
              <LabeledTextInput 
                label='First Name'
                textBoxStyle={manageAccessStyle.textInput}
                value={(selectedMember !== null) ? selectedMember?.firstName : ""}
                viewStyle={manageAccessStyle.view}
                readonly={true}
              />
              
              <LabeledTextInput 
                label='Last Name'
                textBoxStyle={manageAccessStyle.textInput}
                value={(selectedMember !== null) ? selectedMember?.lastName : ""}
                viewStyle={manageAccessStyle.view}
                readonly={true}
              />

              {/* Relationship */}
              <View style={[manageAccessStyle.view]}>
                <Text>Relationship</Text>
                <Menu 
                  visible={isMenuVisible}
                  onDismiss={() => setMenuVisibility(false)} 
                  anchor={
                    <Button 
                      onPress={() => setMenuVisibility(true)}
                      style={{
                        backgroundColor: "white",
                        borderColor: "lightgray",
                        borderBottomWidth: 1,
                        borderRadius: 0,
                        paddingVertical: 0, 
                        marginBottom: 10,
                      }}
                      labelStyle={{
                        width: "100%",
                        textAlign: "left",
                        color: "black",
                        fontWeight: "light",
                        paddingLeft: 16
                      }}
                    >
                      {selectedRelationshipText}
                    </Button>
                  }
                >
                  {options.map((item, index) => (
                    <Menu.Item 
                      key={index}
                      onPress={() => {
                        handleSelectRelationship(item);
                      }}
                      title={item.name}
                    />
                  ))}
                </Menu>
              </View>

              {/* Radio Button Authorization */}
              <View style={[manageAccessStyle.view, manageAccessStyle.flexRow, {
                alignItems: "center",
                gap: 20,
                marginBottom: 25,
              }]}>
                <Text>Authorize? </Text>

                <View style={[manageAccessStyle.view, manageAccessStyle.flexRow, {
                  alignItems: "center"
                }]}>
                  <RadioButton 
                    value='Yes' 
                    status={(selectedAuthorization === true) ? "checked" : "unchecked"} 
                    onPress={() => handleSettingAuthorization(true)}
                    color={Colors['light'].backgroundDark}
                  />
                  <Text>Yes </Text>
                </View>

                <View style={[manageAccessStyle.view, manageAccessStyle.flexRow, {
                  alignItems: "center"
                }]}>
                  <RadioButton 
                    value='No' 
                    status={(selectedAuthorization === false) ? "checked" : "unchecked"} 
                    onPress={() => handleSettingAuthorization(false)}
                    color={Colors['light'].backgroundDark}
                  />
                  <Text>No </Text>
                </View>
              </View>

              {/* Actions */}
              <View style={[manageAccessStyle.view, manageAccessStyle.formGroup, {width: "100%"}]}>
                <TouchableOpacity 
                  style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormHalf, manageAccessStyle.btnSecondary]}
                  onPress={handleCancelForm}
                >
                  <Text style={[text.bold]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    manageAccessStyle.actionSubmitButton, 
                    manageAccessStyle.btnFormHalf, 
                    manageAccessStyle.btnPrimary,
                    {
                      filter: submitBtnStatusDisabled ? "contrast(60%)" : "contrast(100%)",
                    }
                  ]}
                  onPress={handleSubmitForm}
                  disabled={ submitBtnStatusDisabled }
                >
                  <Text style={[text.bold]}>{(type === "add") ? "Add" : "Save"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    </PaperProvider>
  )
}

export default MemberForm;
