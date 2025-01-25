// Components
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";

// Library
import { StyleSheet, TouchableOpacity, Animated, Dimensions, Pressable } from "react-native";
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

// Dimension
const { height } = Dimensions.get('screen');

export const PackageLogDetailModal = (props: { 
  modalPackageDetailState: boolean;
  handleClosePackageDetailModal: () => void;
  modalData: TParcelDetail
}) => {
  // Drilled Prop
  const { modalPackageDetailState, handleClosePackageDetailModal, modalData: parcel } = props;
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  // Toggler
  useEffect(() => {
    if (modalPackageDetailState) {
      openModal();
    }
  }, [modalPackageDetailState]);

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
      handleClosePackageDetailModal();
    });
  };

  return (
    <>
      { modalPackageDetailState && 
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
            {/* Button */}
            <View style={[modalStyle.viewDefault, modalStyle.modalContent]}>

              <View style={[modalStyle.viewDefault, { width: "80%", marginBottom: 20, marginTop: 20 }]}>
                <Text style={[text.headingTwo]}>PARCEL DETAILS</Text>
                <Text><Text style={[text.subHeading]}>Status</Text>: <Text style={text.bold}>{(parcel.status == "Picked Up") ? "Retrieved" : "Delivered"}</Text></Text>
              </View>

              <View style={[modalStyle.viewDefault, {width: "80%", marginBottom: 20 }]}>
                <Text style={[text.bold, {marginBottom: 10}]}>DETAILS:</Text>
                
                <View style={styles.viewDefault}>
                  {/* Parcel ID */}
                  <Text><Text style={text.bold}>Parcel ID</Text>: {parcel.trackingId}</Text>
                  {/* Parcel Name */}
                  <Text><Text style={text.bold}>Parcel Name</Text>: {parcel.name}</Text>
                  {/* Retrieved By */}
                  {parcel.status !== "Not Picked Up" && <Text><Text style={text.bold}>Retrieved By</Text>: Aldwin Samano</Text>}
                  {/* Locker Number */}
                  <Text><Text style={text.bold}>Locker Number</Text>: #02</Text>
                  {/* Delivered On */}
                  <Text><Text style={text.bold}>Delivered On</Text>: November 28, 2024 at 3:45 PM</Text>
                  {/* Time Remaining */}
                  {parcel.status !== "Picked Up" && <><Text><Text style={text.bold}>Time Remaining</Text>: 5 Hours Left</Text> <Text style={[text.mute]}>{"(Pick up before admin removes for space)"}</Text></>}
                </View>
              </View>

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