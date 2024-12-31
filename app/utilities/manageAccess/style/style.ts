import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    flex: 1,

    backgroundColor: "#eee",
  },
});

export const manageAccessStyle = StyleSheet.create({
  // Global
  flexRow: {
    flexDirection: "row",
  },
  alignItemsCenter: {
    alignItems: "center",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light["backgroundDark"],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  // Member List
  memberList: {
    position: "relative",
    width: "100%",
    height: "75%",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  memberHeader: {
    position: "relative",
    width: "90%",
    paddingTop: 25,
    paddingHorizontal: 4,
    flex: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  memberBody: {
    position: "relative",
    width: "90%",
  },
  memberBodyListItem: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginVertical: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    boxShadow: "0 5px 10px lightgray",

    // backgroundColor: "white",
  },

  actionEditButton: {
    width: 80,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors["light"].backgroundDark,
    borderRadius: 10,
    boxShadow: "0 5px 10px lightgray",
  },
})