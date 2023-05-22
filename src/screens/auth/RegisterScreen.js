import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import useAuth from "../../hooks/useAuth";

import InputField from "../../components/InputField";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../../components/CustomButton";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("Hans@gmail.com");
  const [password, setPassword] = useState("Test123!");
  const { onRegister } = useAuth();

  // We automatically call the login after a successful registration
  const register = async () => {
    const result = await onRegister(email, password);
    if (result.error) {
      alert(result.msg);
    } else {
      console.log("Successfully logged in");
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <CustomButton label={"Register"} onPress={register} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
