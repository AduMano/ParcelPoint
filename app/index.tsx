import Colors from "@/constants/Colors";
import { ApiSetup } from "@/helpers/ApiSetup";
import { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { API_URL as AAPIURL } from "./utilities/home/atoms/atom";
import { useRecoilState } from "recoil";
import { router } from "expo-router";

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
