import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import { COLORS, ROUTES } from "../../constants";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          backgroundColor: "#AD40AF",
          padding: 20,
          width: "90%",
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
