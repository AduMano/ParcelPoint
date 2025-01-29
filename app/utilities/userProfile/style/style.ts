import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loading: {
    position: "absolute", 
    top: 0, left: 0, 
    width: "100%", 
    height: "100%", 
    flex: 1, 
    backgroundColor: "#ffffffee", 
    justifyContent: "center", 
    alignItems: "center",
    zIndex: 9999, 
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  
  userImage: {
    position: "relative",
    width: 180,
    height: 180,
    marginBottom: 10,

    borderRadius: 100,
    borderColor: "white",
    borderWidth: 8,
  },

  // BG 
  slantedBG: {
    position: "absolute",
    top: -260, left: "50%",
    width: "250%",
    height: 400,

    backgroundColor: Colors["light"].backgroundDark,

    transform: [{translateX: "-50%"}, { rotate: '-20deg' }],
    transformOrigin: "center center",
    zIndex: 0,
  },
});

export const userProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  view: {
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light["backgroundDark"],
    zIndex: 1,
  },
  routerBack: {
    position: "absolute",
    left: 16,
  },
  editButton: {
    position: "absolute",
    right: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  // Profile
  profile: {
    position: "relative",
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: "auto"
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10, right: 10,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 100,
  },
  credentials: {
    position: "relative",
    width: "90%",
    marginHorizontal: "auto",
  },

  // Edit Form
  textInput: {height: 20, width: "100%", paddingVertical: 8, marginBottom: 10, backgroundColor: "white"},
  addressInput: {width: "100%", marginBottom: 10, backgroundColor: "white"}
});

export const text = StyleSheet.create({
  maxHeading: {
    fontSize: 26,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headingTwo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 13,
    color: Colors.light["textMute"],
    filter: "invert(1)",
  },
  headingLast: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  bold: {
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
  },

  white: {
    color: "white",
  },

  mute: {
    color: "#000000aa",
  }
});

export const buttons = StyleSheet.create({
  actionSubmitButton: {
    position: "relative",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnDanger: {
    borderWidth: 1,
    backgroundColor: Colors["light"].buttonDanger,
  },
  btnSecondary: {
    borderWidth: 1,
    backgroundColor: "white",
  },
  btnPrimary: {
    backgroundColor: Colors["light"].buttonAction,
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
  },
  btnPail: {
    backgroundColor: Colors["light"].cardColor,

  },
  btnInactive: {
    backgroundColor: "transparent",
    borderColor: Colors["light"].cardColor,
    borderWidth: 2,
  },
  btnStatusWidth: {
    width: 150,
  }
});

export const padding = StyleSheet.create({
  four: {
    paddingVertical: 24,
  },
  six: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  }
});

export const modalStyle = StyleSheet.create({
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