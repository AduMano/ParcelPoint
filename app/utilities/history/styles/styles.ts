// Component
import Colors from "@/constants/Colors";

// Library
import { Dimensions, StyleSheet } from "react-native";

// Constants
const screenWidth = Dimensions.get("window").width;

export const historyStyle = StyleSheet.create({
  view: {
    backgroundColor: "transparent",
  },
  fillFlex: {
    flex: 1,
  },
  gap2: {
    gap: 8,
  },
  gap4: {
    gap: 16,
  },
  flex: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  roundedBoarder: {
    borderRadius: 8,
  },

  // HEADER
  headerSection: {
    position: "relative",
    width: "100%",
    justifyContent: "space-between",

    padding: 20,

    backgroundColor: Colors.light["backgroundDark"],
    borderWidth: 1,
  },

  // Date Picker
  rangedDatePicker: {
    position: "relative",
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 20,
    backgroundColor: "#ffffffcc",
    borderRadius: 90,
  },

  // Logs
  historyList: {
    position: "relative",
    flexDirection: "column",
    // justifyContent: "space-between",
  },
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

export const styles = StyleSheet.create({
  viewDefault: {
    backgroundColor: "transparent",
  },
  historyItems: {
    width: "100%",
    justifyContent: "space-between", 
    alignItems: "center",
    position: "relative",
    paddingVertical: 10,
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "lightgrey",
    borderBottomColor: "lightgrey",
  },
  historyInfo: {
    position: "relative",
    width: "75%",
  },
})

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
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  six: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  }
});
