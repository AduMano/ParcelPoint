// Components
import { View, Text } from '@/components/Themed';

// Library
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Portal } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

// Styles
import { userProfileStyle, text, modalStyle } from '../style/style';

// Helpers
import { IonIconByName } from '@/helpers/IconsLoader';
import { getMonthNameDayYearByDate } from '@/helpers/textFormatter';

// Types
import { IUserInformation, IUserUpdateInformation } from '../types/types';
import { LabeledTextInput } from '@/components/LabeledTextInput';

// Dimension
const { height } = Dimensions.get('screen');

const EditProfileForm = (props: {
  userID: string;
  modalData: IUserInformation;
  defaultInformation: IUserUpdateInformation;
  modalEditProfileState: boolean;
  
  handleUpdateUserInformation: (userData: IUserUpdateInformation) => void;
  setIsLoading: (value: boolean) => void;
}) => {
  // Drilled Prop
  const { userID, modalData: userProfile, defaultInformation, modalEditProfileState } = props;
  const { setIsLoading, handleUpdateUserInformation } = props;

  // Animation
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  /// States
  // User Info
  const [firstName, setFirstName] = useState<string>(userProfile.firstName);
  const [lastName, setLastName] = useState<string>(userProfile.lastName);
  const [username, setUsername] = useState<string>(userProfile.username);
  const [getBirthDate, setBirth] = useState<Date | string>(userProfile.birthDate);
  const [address, setAddress] = useState<string>(userProfile.address);

  // Date Modal
  const [isDateModalVisible, setDateModalVisibility] = useState<boolean>(false);

  // Changes
  const [isChanged, setChangeStatus] = useState<boolean>(false);

  // Toggler
  useEffect(() => {
    if (modalEditProfileState) {
      setChangeStatus(handleCheckChanges());
      openModal();
    }
    else {
      closeModal();
    }
  }, [modalEditProfileState]);

  // Changes
  useEffect(() => {
    setChangeStatus(handleCheckChanges());
  }, [firstName, lastName, username, getBirthDate, address]);

  /// Handlers
  // Edit Modal Handler
  const openModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height, 
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  // Change Checker Handler
  const handleCheckChanges = useCallback(() => {
    return defaultInformation.firstName === firstName &&
    defaultInformation.lastName === lastName &&
    defaultInformation.username === username &&
    defaultInformation.birthDate === getBirthDate &&
    defaultInformation.address === address;
  }, [firstName, lastName, username, getBirthDate, address, modalEditProfileState]);

  // Date Modal Handler
  const handleDateOnConfirm = useCallback((params: any) => {
    setDateModalVisibility(false);
    const date = new Date(params.date);
    date.setDate(date.getDate() + 1);
    
    setBirth(date.toISOString().split("T")[0]);
  }, [setDateModalVisibility, setBirth]);

  const handleDateOnDismiss = useCallback(() => {
    setDateModalVisibility(false);
  }, [setDateModalVisibility]);

  // Save Changes Handler
  const handleSaveChanges = useCallback(async () => {
    // Save Changes
    setIsLoading(true);
    await handleUpdateUserInformation({
      firstName,
      lastName,
      username,
      address,
      birthDate: getBirthDate,
      id: userID
    });
  }, [firstName, lastName, username, getBirthDate, address]);

  const handleSaveAction = useCallback(() => {
    /// Validate
    // Check forms if empty
    if ([firstName, lastName, username, address].some((value) => value.trim() === "" )) {
      Alert.alert("Notice", "All input fields must NOT be empty");
      return;
    }

    // If all is satisfied, Save Changes
    Alert.alert("Notice", "Are you sure you want to update your profile information?", [
      { text: "No" },
      { text: "Yes", onPress: () => handleSaveChanges()}
    ]);
  }, [firstName, lastName, username, getBirthDate, address]);

  return (
    <>
      {/* Modal */}
      <Portal>
        <DatePickerModal
          mode="single"
          locale="en"
          visible={isDateModalVisible}
          onDismiss={handleDateOnDismiss}
          date={new Date(getBirthDate)}
          onConfirm={handleDateOnConfirm}
          validRange={{endDate: new Date()}}
          saveLabel="Select"
          label="Select your Birth Date"
          
        />
      </Portal>

      { modalEditProfileState && 
        <View style={[ modalStyle.viewDefault, modalStyle.modalContainer ]}>
          {/* BackDrop */}
          <Pressable onPress={closeModal} style={[modalStyle.viewDefault, modalStyle.modalBackDrop]}>
          </Pressable>

          {/* Modal */}
          <Animated.View style={[modalStyle.modal, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={modalStyle.closeButton} onPress={closeModal}>
              <IonIconByName name="close" size={40} color="black" />
            </TouchableOpacity>

            {/* Body of Modal consists of: */}
            {/* Header */}
            {/* Details */}
            {/* Action */}
            <View style={[modalStyle.viewDefault, modalStyle.modalContent]}>
              {/* Header */}
              <View style={[modalStyle.viewDefault, { width: "80%", marginTop: 20 }]}>
                <Text style={[text.heading, text.center, {marginBottom: 10}]}>Edit Profile</Text>
              </View>

              {/* Details */}
              <View style={[modalStyle.viewDefault, {width: "80%", marginBottom: 20 }]}>
                {/* Name */}
                <LabeledTextInput 
                  label='First Name'
                  onChange={setFirstName}
                  textBoxStyle={userProfileStyle.textInput}
                  textStyle={text.mute}
                  value={firstName}
                  viewStyle={userProfileStyle.view}
                />

                
                <LabeledTextInput 
                  label='Last Name'
                  onChange={setLastName}
                  textBoxStyle={userProfileStyle.textInput}
                  textStyle={text.mute}
                  value={lastName}
                  viewStyle={userProfileStyle.view}
                />
                
                {/* Username */}
                <LabeledTextInput 
                  label='Username'
                  onChange={setUsername}
                  textBoxStyle={userProfileStyle.textInput}
                  textStyle={text.mute}
                  value={username}
                  viewStyle={userProfileStyle.view}
                />

                {/* BirthDate */}
                <LabeledTextInput 
                  label='Birth Date'
                  textBoxStyle={userProfileStyle.textInput}
                  textStyle={text.mute}
                  value={getMonthNameDayYearByDate(new Date(getBirthDate))}
                  viewStyle={userProfileStyle.view}
                  onPress={() => setDateModalVisibility(true)}
                />

                {/* Addresss */}
                <LabeledTextInput 
                  label='Address'
                  onChange={setAddress}
                  textBoxStyle={userProfileStyle.addressInput}
                  textStyle={text.mute}
                  value={address}
                  viewStyle={userProfileStyle.view}
                  multiline={true}
                />
              </View>
              
              {/* Okay Button */}
              <TouchableOpacity 
                style={[modalStyle.button, { 
                  marginBottom: 30,  
                  filter: isChanged ? "contrast(60%)" : "contrast(100%)",
                }]} 
                onPress={handleSaveAction}
                disabled={isChanged}
              >
                  <Text style={[text.headingTwo, text.center]}>Save</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      }
    </>
  );
};

export default EditProfileForm;