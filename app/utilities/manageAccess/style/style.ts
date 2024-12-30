import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    flex: 1,

    backgroundColor: "white",
  },
});

export const manageAccessStyle = StyleSheet.create({
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

    borderWidth: 1,
  },
  memberHeader: {
    position: "relative",
    width: "90%",
    paddingTop: 25,
    paddingHorizontal: 4,
    flex: 0,
    justifyContent: "space-between",
    flexDirection: "row",

    borderBottomWidth: 1,
    borderBottomColor: Colors["light"].backgroundGray,
  },
})