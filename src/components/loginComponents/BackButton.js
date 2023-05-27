import React from "react";
import { TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";
// import StatusBarHeight from "@expo/status-bar-height";

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/loginImages/arrow_back.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + StatusBar.currentHeight,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});
