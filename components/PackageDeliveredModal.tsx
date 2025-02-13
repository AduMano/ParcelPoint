// Components
import { View, Text } from "./Themed";

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
import { TParcelDetail } from "@/app/utilities/home/types/type";
import { formatDateTime } from "@/helpers/textFormatter";

// Contants
import Colors from "@/constants/Colors";

// Dimension
const { height } = Dimensions.get('screen');

const PackageDeliveredModal = (props: { 
  modalPackageState: boolean;
  handleClosePackageModal: () => void;
  modalData: TParcelDetail
}) => {
  // Drilled Prop
  const { modalPackageState, handleClosePackageModal, modalData: parcel } = props;
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  // Toggler
  useEffect(() => {
    if (modalPackageState) {
      openModal();
    }
  }, [modalPackageState]);

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
      handleClosePackageModal();
    });
  };

  return (
    <>
      { modalPackageState && 
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
            {/* Image of Package */}
            {/* Header */}
            {/* Details */}
            <View style={[modalStyle.viewDefault, modalStyle.modalContent]}>
              <View style={[modalStyle.viewDefault, {marginBottom: 0, paddingBottom: 0}]}>
                <Image 
                  source={require(`@/assets/images/dashboard/homepage/package.png`)}
                  style={{
                    position: "relative",
                    width: 220, height: 220,
                    padding: 0, margin: 0,
                  }}
                />
              </View>

              <View style={[modalStyle.viewDefault, { width: "80%", marginBottom: 20 }]}>
                <Text style={[text.bold, text.center, {marginBottom: 10}]}>YOUR PARCEL IS READY FOR PICK-UP!</Text>
                <Text style={[ text.center]}>Your parcel has been successfully Delivered and is now stored in the locker.</Text>
              </View>

              <View style={[modalStyle.viewDefault, {width: "80%", marginBottom: 40 }]}>
                <Text style={[text.bold, {marginBottom: 10}]}>DELIVERY DETAILS:</Text>
                
                <View style={styles.viewDefault}>
                  {/* Parcel ID */}
                  <Text><Text style={text.bold}>Parcel ID</Text>: {parcel.parcelId?.split("-").join("").substring(0, 10)}</Text>
                  {/* Parcel Name */}
                  <Text><Text style={text.bold}>Parcel Name</Text>: {parcel.parcelName} {parcel.parcelId?.substring(0, 5)}</Text>
                  {/* Locker Number */}
                  <Text><Text style={text.bold}>Locker Number</Text>: #{parcel.lockerNumber !== undefined ? parcel.lockerNumber : "1" }</Text>
                  {/* Delivered On */}
                  <Text><Text style={text.bold}>Delivered On</Text>: {formatDateTime(new Date(parcel.arrivedAt ?? new Date()))}</Text>
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

export default PackageDeliveredModal;
