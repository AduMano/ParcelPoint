import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
});

export const userProfileStyle = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
    },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light["backgroundDark"],
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
})