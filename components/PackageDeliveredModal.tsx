// Components
import { IonIconByName } from "@/helpers/IconsLoader";
import { View } from "./Themed";

// Library
import { StyleSheet, TouchableOpacity } from "react-native";

export const PackageDeliveredModal = (props: { onClose?: () => void }) => {
  // Drilled Prop
  const { onClose } = props;

  // Functions
  const handleCloseModal = () => {
    // onClose();
  };

  return (
    <>
      <View style={[styles.viewDefault, styles.modalContainer]}>
        {/* BackDrop */}
        <View style={[styles.viewDefault]}></View>

        {/* Modal */}
        <View style={[styles.viewDefault]}>
          <TouchableOpacity onPress={handleCloseModal}>
            <IonIconByName name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
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

    backdropFilter: "blur(0.4px) brightness(0.8)",
  },
});
