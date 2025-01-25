// Components 
import { Text, View } from '@/components/Themed';
import { LabeledTextInput } from '@/components/LabeledTextInput';

// Library
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PaperProvider, Portal, Searchbar, TextInput, Menu, Button, RadioButton } from 'react-native-paper';
import { TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Styles
import { styles, manageAccessStyle } from '../style/style';
import { text } from '../../home/styles/styles';

// Helpers
import { FA6IconByName } from '@/helpers/IconsLoader';

// Constants
import Colors from '@/constants/Colors';

// Types
import { IMember } from '../types/types';

const MemberForm = () => {
  /// Global Hooks
  // Router
  const router = useRouter();
  const { type, id, memberList } = useLocalSearchParams();

  // Init Var
  const [members, setMembers] = useState<IMember[] | null>(null);
  const [selectedMember, setSelectedMember] = useState<IMember | undefined>();

  // ID State
  const userID = useMemo(() => id?.toString() || null, []);
  
  // OnLoad
  useEffect(() => {
    setMembers(JSON.parse(memberList.toString()));
  }, []);

  // Displaay States
  const [searchValue, setSearchValue] = useState<string>("");

  // Menu State
  const [submitBtnStatusDisabled, setSubmitButtonStatusDisabled] = useState<boolean>(true);
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);
  const [selectedRelationship, setRelationship] = useState<number>(0);
  const [selectedRelationshipText, setRelationshipText] = useState<string | undefined>("Select Relationship");
  const options = useMemo(() => {
    return [
      { text: "Select Relationship", value: 0 },
      { text: "Aunt", value: 7 },
      { text: "Brother", value: 1 },
      { text: "Colleague", value: 13 },
      { text: "Cousin", value: 9 },
      { text: "Father", value: 4 },
      { text: "Friend", value: 12 },
      { text: "Grandfather", value: 6 },
      { text: "Grandmother", value: 5 },
      { text: "Mother", value: 3 },
      { text: "Nephew", value: 11 },
      { text: "Niece", value: 10 },
      { text: "Sister", value: 2 },
      { text: "Uncle", value: 8 }
    ]    
  }, []);

  // Radio Button State
  const [selectedAuthorization, setAuthorization] = useState<boolean>(false);

  // Handlers 
  const handleSearchAction = useCallback(() => {
    const result = members?.find((member) => member.username === searchValue);

    // Guard Clause
    if (result === undefined || result === null) {
      setSelectedMember(undefined);
      Alert.alert("Notice", "No User Found. Make sure you typed it correctly or if the user really does exist.");
      return;
    }

    setSelectedMember(result);
  }, [searchValue]);

  const handleSelectRelationship = (item: {text: string; value: number}) => {
    setRelationship(item.value); // Store value
    setRelationshipText(item.text); // Store value
    setMenuVisibility(false);
  };

  const handleSettingAuthorization = (status: boolean) => {
    setAuthorization(status);
  }

  const getSelectedMember = (value: string, type: string) => {
    if (type === "id") {
      return members?.find((member) => member.id === value) || undefined
    }
    else if (type === "username") {
      return members?.find((member) => member.username === value) || undefined;
    }
  }

  // On Edit (Would be useEffect later)
  const [onLoad, setLoad] = useState<boolean>(false);
  const onEdit = async () => {
    if (userID !== null && !onLoad) {
      const member = await getSelectedMember(userID, "id");
      setSelectedMember(member);
      setRelationshipText(member?.relationship);
      setRelationship(() => options.find((relation) => relation.text === member?.relationship)?.value || 0);
      setAuthorization(() => member?.isAuthorized === "Authorized" ? true : false);
      setLoad(true);
    }
  }

  onEdit();

  // On Edit Changes
  useEffect(() => {
    // Check if Authorization and Relationship matches with current selected user
    const getCurrentAuthorization = (selectedAuthorization) ? "Authorized" : "Not Authorized";
    const relationshipComparison = selectedMember?.relationship === selectedRelationshipText;
    const authorizationComparison = selectedMember?.isAuthorized === getCurrentAuthorization;
    
    setSubmitButtonStatusDisabled(type === 'edit' && relationshipComparison && authorizationComparison);
  }, [selectedRelationship, selectedAuthorization, selectedMember]);
  

  const handleSubmitForm = useCallback(() => {
    // Validation
    if (selectedMember === undefined) {
      Alert.alert("Notice", "Select a user in able to do this action")
      return;
    }

    // Confirmation
    Alert.alert("Notice", `Are you sure you want to ${type} this user?`, [
      { text: "No" },
      { text: "Yes", onPress: () => router.back() }
    ]);

    // Submission
    switch(type) {
      case "add":

      break;
      case "edit":

      break;
    }
  }, [selectedMember]);

  const handleCancelForm = useCallback(() => {
    // Check if theres any changes
    if ((type === "edit" && !submitBtnStatusDisabled) || (type === "add" &&  selectedMember !== undefined)) {
      handleConfirmExitDialog();
      return;
    }

    router.back();

  }, [submitBtnStatusDisabled, selectedMember]);

  const handleConfirmExitDialog = useCallback(() => {
    Alert.alert("Notice", "Are you sure you want to cancel this form? Your progress will be discarded", [
      {text: "No"},
      {text: "Yes", onPress: () => router.back() }
    ]);
  }, []);
  
  return (
    <PaperProvider>
      <>
        {/* Modals */}
        <Portal>
          <View></View>
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
                  onClearIconPress={() => setSelectedMember(undefined)}
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
                  source={(selectedMember !== undefined) ? require(`@/assets/images/icon.png`) : require(`@/assets/images/dashboard/homepage/package.png`)} // Replace with your local image
                  style={[manageAccessStyle.MemberImage]}
                />
                
                {/* Two Inputs User Info */}
                <View style={[manageAccessStyle.view, {flex: 1}]}>
                  <LabeledTextInput 
                    label='User ID'
                    textBoxStyle={manageAccessStyle.textInput}
                    value={(selectedMember !== undefined) ? selectedMember?.id : ""}
                    viewStyle={manageAccessStyle.view}
                    readonly={true}
                  />
                  
                  <LabeledTextInput 
                    label='Username'
                    textBoxStyle={manageAccessStyle.textInput}
                    value={(selectedMember !== undefined) ? selectedMember?.username : ""}
                    viewStyle={manageAccessStyle.view}
                    readonly={true}
                  />
                </View>
              </View>
              
              <LabeledTextInput 
                label='First Name'
                textBoxStyle={manageAccessStyle.textInput}
                value={(selectedMember !== undefined) ? selectedMember?.firstName : ""}
                viewStyle={manageAccessStyle.view}
                readonly={true}
              />
              
              <LabeledTextInput 
                label='Last Name'
                textBoxStyle={manageAccessStyle.textInput}
                value={(selectedMember !== undefined) ? selectedMember?.lastName : ""}
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
                      title={item.text}
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
                      filter: submitBtnStatusDisabled && type === "edit" || 
                      selectedMember === undefined && type === "add" ? "contrast(60%)" : "contrast(100%)",
                    }
                  ]}
                  onPress={handleSubmitForm}
                  disabled={(type === "edit") ? submitBtnStatusDisabled : (selectedMember === undefined) ? true : false }
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
