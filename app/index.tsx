import Colors from "@/constants/Colors";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Image
        source={require(`@/assets/images/icon.png`)} // Replace with your local image
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors["light"].backgroundDark,
  },
  image: {
    position: "relative",
    width: 200, height: 200,
  },
});
