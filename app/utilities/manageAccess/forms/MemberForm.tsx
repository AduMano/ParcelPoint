// Components 
import { Text, View } from '@/components/Themed';

// Library
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PaperProvider, Portal, Searchbar, TextInput, Menu, Button, RadioButton } from 'react-native-paper';
import { TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Styles
import { styles, manageAccessStyle } from '../style/style';

// Helpers
import { FA6IconByName } from '@/helpers/IconsLoader';

// Constants
import Colors from '@/constants/Colors';
import { text } from '../../home/styles/styles';

const MemberForm = () => {
  // Router
  const router = useRouter();
  const { type, id } = useLocalSearchParams();

  // ID State
  const userID = useMemo(() => id || null, []);
  
  // Fetch if edit
  useEffect(() => {
    if (userID != null) console.log(userID);
  }, [userID]);

  // Displaay States
  const [searchValue, setSearchValue] = useState<string>("");

  // Menu State
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);
  const [selectedRelationship, setRelationship] = useState<number>(0);
  const [selectedRelationshipText, setRelationshipText] = useState<string>("Select Relationship");
  const options = useMemo(() => {
    return [
      { text: "Select Relationship", value: 0 },
      { text: "Brother", value: 1 },
      { text: "Sister", value: 2 },
      { text: "Mother", value: 3 },
      { text: "Father", value: 4 },
      { text: "Grandmother", value: 5 },
      { text: "Grandfather", value: 6 },
      { text: "Aunt", value: 7 },
      { text: "Uncle", value: 8 },
      { text: "Cousin", value: 9 },
      { text: "Niece", value: 10 },
      { text: "Nephew", value: 11 },
      { text: "Friend", value: 12 },
      { text: "Colleague", value: 13 }
    ]
  }, []);

  // Radio Button State
  const [selectedAuthorization, setAuthorization] = useState<boolean>(false);

  // Handlers 
  const handleSelectRelationship = (item: {text: string; value: number}) => {
    setRelationship(item.value); // Store value
    setRelationshipText(item.text); // Store value
    setMenuVisibility(false);
  };

  const handleSubmitForm = useCallback(() => {
    switch(type) {
      case "add":

      break;
      case "edit":

      break;
    }
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
                  onSubmitEditing={() => {}}
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
                  source={require(`@/assets/images/icon.png`)} // Replace with your local image
                  style={[manageAccessStyle.MemberImage]}
                />
                
                {/* Two Inputs User Info */}
                <View style={[manageAccessStyle.view, {flex: 1}]}>
                  <View style={[manageAccessStyle.view]}>
                    <Text>User ID</Text>
                    <TextInput value={"Test"} contentStyle={{color: "black"}} readOnly={true} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
                  </View>
                  <View style={[manageAccessStyle.view]}>
                    <Text>Username</Text>
                    <TextInput value={"Test"} contentStyle={{color: "black"}} readOnly={true} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
                  </View>
                </View>
              </View>
              
              {/* First Name and Last Name */}
              <View style={[manageAccessStyle.view]}>
                <Text>First Name</Text>
                <TextInput value={"Test"} contentStyle={{color: "black"}} readOnly={true} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
              </View>
              <View style={[manageAccessStyle.view]}>
                <Text>Last Name</Text>
                <TextInput value={"Test"} contentStyle={{color: "black"}} readOnly={true} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
              </View>

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
                      onPress={() => handleSelectRelationship(item)}
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
                    onPress={() => setAuthorization(true)}
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
                    onPress={() => setAuthorization(false)}
                    color={Colors['light'].backgroundDark}
                  />
                  <Text>No </Text>
                </View>
              </View>

              {/* Actions */}
              <View style={[manageAccessStyle.view, manageAccessStyle.formGroup, {width: "100%"}]}>
                <TouchableOpacity 
                  style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormHalf, manageAccessStyle.btnSecondary]}
                  onPress={() => router.back()}
                >
                  <Text style={[text.bold]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[manageAccessStyle.actionSubmitButton, manageAccessStyle.btnFormHalf, manageAccessStyle.btnPrimary]}
                  onPress={handleSubmitForm}
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
