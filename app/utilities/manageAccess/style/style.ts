import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loading: {
    position: "absolute", 
    top: 0, left: 0, 
    width: "100%", 
    height: "100%", 
    flex: 1, 
    backgroundColor: "#ffffffaa", 
    justifyContent: "center", 
    alignItems: "center",
    zIndex: 9999, 
  },
  container: {
    position: "relative",
    width: "100%", height: "100%",
    flex: 1,

    backgroundColor: "#eee",
  },
});

export const manageAccessStyle = StyleSheet.create({
  // Global
  view: {
    backgroundColor: "transparent",
  },
  flexRow: {
    flexDirection: "row",
  },
  alignItemsEnd: {
    alignItems: "flex-end",
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
  routerBack: {
    position: "absolute",
    left: 16,
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
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
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
    position: "relative",
    width: 80,
    height: "90%",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors["light"].backgroundDark,
    borderRadius: 10,
    boxShadow: "0 5px 10px lightgray",
  },

  // Member Action
  memberAction: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent:"flex-end",
    backgroundColor: "transparent",
    marginVertical: 20,
    gap: 20,
  },

  actionSubmitButton: {
    position: "relative",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  formGroup: {
    position: "relative",
    width: "90%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Form input Style
  textInput: {
    height: 20, 
    width: "100%", 
    paddingVertical: 10, 
    marginBottom: 10, 
    backgroundColor: "white",
  },


  // BUTTON STYLES
  btnFormHalf: {
    width: "48%",
  },
  btnFormFull: {
    width: "90%",
    // marginTop: 12,
  },

  // MEMBER FORM
  memberForm: {
    position: "relative",
    width: "90%",
    marginHorizontal: "auto",
    paddingVertical: 20,
    flex: 1,
    
    // backgroundColor: "#ff000010",
  },

  MemberImage: {
    position: 'relative',
    width: 160, height: 160,
    borderRadius: 100,
    borderWidth: 5,
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
  }
})