// Components
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";

// Library
import { StyleSheet, TouchableOpacity, Animated, Dimensions, Image, Pressable } from "react-native";
import React, { useEffect, useRef } from 'react';

// Helpers
import { IonIconByName } from "@/helpers/IconsLoader";

// Styles
import {
  styles,
  text,
} from "@/app/utilities/home/styles/styles";

// Types
import { TNotificationDetails } from "@/app/utilities/notification/types/types";

// Dimension
const { height } = Dimensions.get('screen');

const NotificationDetailModal = (props: { 
  modalNotificationState: boolean;
  handleCloseNotificationModal: () => void;
  modalData: TNotificationDetails
}) => {
  // Drilled Prop
  const { modalNotificationState, handleCloseNotificationModal, modalData: notification } = props;
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  // Toggler
  useEffect(() => {
    if (modalNotificationState) {
      openModal();
    }
  }, [modalNotificationState]);

  // Handlers
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
      handleCloseNotificationModal();
    });
  };

  return (
    <>
      { modalNotificationState && 
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
            {/* Okay Button */}
            <View style={[modalStyle.viewDefault, modalStyle.modalContent]}>
              {/* Header */}
              <View style={[modalStyle.viewDefault, { width: "80%", marginBottom: 25, marginTop: 20 }]}>
                <Text style={[text.heading, {marginBottom: 10}]}>{notification.modalTitle}</Text>
                <Text style={[{width: "90%"}]}>{notification.modalDescription}</Text>
              </View>

              {/* Details */}
              <View style={[modalStyle.viewDefault, {width: "80%", marginBottom: 20 }]}>
                <Text style={[text.bold, {marginBottom: 10}]}>DETAILS:</Text>
                
                <View style={styles.viewDefault}>
                  <Text><Text style={text.bold}>Date</Text>: {notification.dateTime}</Text>
                  { notification.expirationDate && 
                    <Text><Text style={text.bold}>Expiration Date</Text>: {notification.expirationDate}</Text>
                  }
                  { notification.lockerNumber && 
                    <Text><Text style={text.bold}>Locker Number</Text>: {notification.lockerNumber}</Text>
                  }
                  { notification.retrievedBy && 
                    <Text><Text style={text.bold}>Retrieved By</Text>: {notification.retrievedBy}</Text>
                  }
                </View>
              </View>
              
              {/* Okay Button */}
              <TouchableOpacity style={[modalStyle.button, { marginBottom: 30 }]} onPress={closeModal}>
                  <Text style={[text.headingTwo, {textAlign: "center"}]}>OK</Text>
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

export default NotificationDetailModal;
