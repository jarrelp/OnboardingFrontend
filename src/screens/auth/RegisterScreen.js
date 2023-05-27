import React, { useState } from "react";
// import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import useAuth from "../../hooks/useAuth";

import InputField from "../../components/InputField";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../../components/CustomButton";

// const RegisterScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("Hans@gmail.com");
//   const [password, setPassword] = useState("Test123!");
//   const { onRegister } = useAuth();

//   // We automatically call the login after a successful registration
//   const register = async () => {
//     const result = await onRegister(email, password);
//     if (result.error) {
//       alert(result.msg);
//     } else {
//       console.log("Successfully logged in");
//       navigation.goBack();
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
//       <View
//         showsVerticalScrollIndicator={false}
//         style={{ paddingHorizontal: 25 }}
//       >
//         <Text
//           style={{
//             fontSize: 28,
//             fontWeight: "500",
//             color: "#333",
//             marginBottom: 30,
//           }}
//         >
//           Register
//         </Text>

//         <InputField
//           label={"Email"}
//           icon={
//             <MaterialIcons
//               name="alternate-email"
//               size={20}
//               color="#666"
//               style={{ marginRight: 5 }}
//             />
//           }
//           keyboardType="email-address"
//           onChangeText={(text) => setEmail(text)}
//           value={email}
//         />

//         <InputField
//           label={"Password"}
//           icon={
//             <Ionicons
//               name="ios-lock-closed-outline"
//               size={20}
//               color="#666"
//               style={{ marginRight: 5 }}
//             />
//           }
//           inputType="password"
//           onChangeText={(text) => setPassword(text)}
//           value={password}
//         />

//         <InputField
//           label={"Confirm Password"}
//           icon={
//             <Ionicons
//               name="ios-lock-closed-outline"
//               size={20}
//               color="#666"
//               style={{ marginRight: 5 }}
//             />
//           }
//           inputType="password"
//         />

//         <CustomButton label={"Register"} onPress={register} />

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "center",
//             marginBottom: 30,
//           }}
//         >
//           <Text>Already registered?</Text>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/loginComponents/Background";
import Logo from "../../components/loginComponents/Logo";
import Header from "../../components/loginComponents/Header";
import Button from "../../components/loginComponents/Button";
import TextInput from "../../components/loginComponents/TextInput";
import BackButton from "../../components/loginComponents/BackButton";
import { THEME, ROUTES } from "../../constants";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { nameValidator } from "../../helpers/nameValidator";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { onRegister } = useAuth();

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    register();
  };

  //We automatically call the login after a successful registration
  const register = async () => {
    const result = await onRegister(email.value, password.value);
    if (result.error) {
      alert(result.msg);
    } else {
      console.log("Successfully logged in");
      alert("Succesvol geregistreerd!");
      navigation.goBack();
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace(ROUTES.LOGIN)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: THEME.colors.primary,
  },
});
