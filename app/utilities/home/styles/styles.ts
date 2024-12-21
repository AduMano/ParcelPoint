// Component
import Colors from "@/constants/Colors";

// Library
import { Dimensions, StyleSheet } from "react-native";

// Constants
const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  viewDefault: {
    backgroundColor: "transparent",
  },
  flex: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    position: "relative",
    height: "100%",
    width: "100%",

    backgroundColor: Colors.light["backgroundDark"],
    flex: 1,
    flexDirection: "column",
  },

  // HEADER
  headerSection: {
    position: "relative",
    width: "100%",
    // height: "30%",
    justifyContent: "space-between",

    padding: 20,

    backgroundColor: Colors.light["backgroundDark"],
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,

    backgroundColor: Colors.light["buttonAction"],
    borderRadius: "50%",
  },

  // BODY
  bodySection: {
    position: "relative",
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  membersSection: {
    position: "relative",
    width: "100%",
    height: "50%",
    flex: 1,
    flexDirection: "column",

    padding: 20,
  },

  household: {
    position: "relative",
    width: "100%",
  },
  memberScroller: {
    position: "relative",
    width: "100%",
    marginVertical: 20,
    gap: 20,
  },
  memberImage: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 100,
  },

  // History Logs
  historyContainer: {
    position: "relative",
    width: "100%",
    flex: 1,
    marginTop: 15,

    overflow: "hidden",
  },
  historyHeader: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  historyList: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    // justifyContent: "space-between",
  },
  historyItems: {
    flex: 0,
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
  historyArrow: {
    position: "absolute",
    right: 0,
    width: "10%",
    height: "100%",
    textAlign: "right",
    backgroundColor: "transparent",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export const text = StyleSheet.create({
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
});

export const scroller = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 0,
  },
  card: {
    width: screenWidth * 0.5, // 50% of screen width
    backgroundColor: Colors.light["cardColor"],
    marginRight: 8,
    marginTop: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  arrow: {
    backgroundColor: Colors.light["cardArrowBG"],
    borderRadius: "50%",
    alignSelf: "center",
  },
});

export const buttons = StyleSheet.create({
  primary: {
    backgroundColor: Colors["light"].buttonAction,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
  },
});
