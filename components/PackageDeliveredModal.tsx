// Components
import { IonIconByName } from "@/helpers/IconsLoader";
import { View } from "./Themed";

// Library
import { StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from 'react';


const { height } = Dimensions.get('screen');

export const PackageDeliveredModal = (props: { 
  modalPackageState: boolean;
  handleClosePackageModal: () => void;
}) => {
  // Drilled Prop
  const { modalPackageState, handleClosePackageModal } = props;
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
        <View style={[ styles.viewDefault, styles.modalContainer ]}>
          {/* BackDrop */}
          <View style={[styles.viewDefault, styles.modalBackDrop]}></View>

          {/* Modal */}
          <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <IonIconByName name="close" size={40} color="black" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
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
    width: "100%", height: "60%",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    textAlign: "right",
  }
});
