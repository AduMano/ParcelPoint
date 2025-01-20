// Components
import { View, Text } from '@/components/Themed';

// Library
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { Portal, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

// Styles
import { userProfileStyle, text, buttons, styles } from '../style/style';

// Helpers
import { IonIconByName } from '@/helpers/IconsLoader';
import { getMonthNameDayYearByDate, stringDatetoObjectDate } from '@/helpers/textFormatter';

// Constants
import Colors from '@/constants/Colors';

// Types
import { IDate, IUserInformation } from '../types/types';

// Dimension
const { height } = Dimensions.get('screen');

const EditProfileForm = (props: {
  modalEditProfileState: boolean;
  handleCloseEditModal: () => void;
  modalData: IUserInformation;
}) => {
  // Drilled Prop
  const { modalEditProfileState, handleCloseEditModal, modalData: userProfile } = props;
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  /// States
  // User Info
  const [firstName, setFirstName] = useState<string>(userProfile.firstName);
  const [lastName, setLastName] = useState<string>(userProfile.lastName);
  const [username, setUsername] = useState<string>(userProfile.username);
  const [birthDate, setBirthDate] = useState<string>(userProfile.birthDate);
  const [address, setAddress] = useState<string>(userProfile.address);

  // Date Modal
  const [isDateModalVisible, setDateModalVisibility] = useState<boolean>(false);
  const [getBirthDate, setBirth] = useState<Date>(stringDatetoObjectDate(birthDate));

  // Toggler
  useEffect(() => {
    if (modalEditProfileState) {
      openModal();
    }
  }, [modalEditProfileState]);

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
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      handleCloseEditModal();
    });
  };

  // Date Modal Handler
  const handleDateOnConfirm = useCallback((params: any) => {
    setDateModalVisibility(false);
    setBirth(params.date);
  }, [setDateModalVisibility, setBirth]);

  const handleDateOnDismiss = useCallback(() => {
    setDateModalVisibility(false);
  }, [setDateModalVisibility]);

  return (
    <>
      {/* Modal */}
      <Portal>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={isDateModalVisible}
          onDismiss={handleDateOnDismiss}
          date={getBirthDate}
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
                <View style={[userProfileStyle.view]}>
                  <Text style={[text.mute]}>First Name</Text>
                  <TextInput value={firstName} contentStyle={{color: "black"}} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
                </View>

                <View style={[userProfileStyle.view]}>
                  <Text style={[text.mute]}>Last Name</Text>
                  <TextInput value={lastName} contentStyle={{color: "black"}} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
                </View>
                
                {/* Username */}
                <View style={[userProfileStyle.view]}>
                  <Text style={[text.mute]}>Username</Text>
                  <TextInput value={username} contentStyle={{color: "black"}} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
                </View>

                {/* BirthDate */}
                <View style={[userProfileStyle.view]}>
                  <Text style={[text.mute]}>Birth Date</Text>
                  <TextInput value={getMonthNameDayYearByDate(getBirthDate)} onPress={() => setDateModalVisibility(true)} style={{height: 20, width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
                </View>

                {/* Addresss */}
                <View style={[userProfileStyle.view]}>
                  <Text style={[text.mute]}>Address</Text>
                  <TextInput value={address} multiline={true} contentStyle={{color: "black"}} style={{width: "100%", paddingVertical: 10, marginBottom: 10, backgroundColor: "white"}} />
                </View>
              </View>
              
              {/* Okay Button */}
              <TouchableOpacity style={[modalStyle.button, { marginBottom: 30 }]} onPress={closeModal}>
                  <Text style={[text.headingTwo, text.center]}>Save</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      }
    </>
  );
};
      
      
const modalStyle = StyleSheet.create({
  viewDefault: {
    backgroundColor: "transparent",
  },
  
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 999,
  },
  modalBackDrop: {
    position: "absolute",
    width: "100%", height: "100%",
    top: 0, left: 0,
    backgroundColor: "#00000055",
  },
  
  modal: {
    position: "absolute",
    bottom: 0, left: 0,
    backgroundColor: "white",
    width: "100%", 
    // height: "60%",
    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    textAlign: "right",
  },
  
  modalContent: {
    position: 'relative',
    flex: 1,
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  
  button: {
    position: "relative",
    width: "86%",
    padding: 8,
    backgroundColor: Colors["light"].buttonAction,

    borderRadius: 10,
  }
});

export default EditProfileForm;