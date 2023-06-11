import React, { useState } from "react";
// import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import useAuth from "../../hooks/useAuth";

import InputField from "../../components/InputField";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../../components/CustomButton";

// const RegisterScreen = ({ navigation }) => {
//   const [username, setUsername] = useState("Hans@gmail.com");
//   const [password, setPassword] = useState("Test123!");
//   const { onRegister } = useAuth();

//   // We automatically call the login after a successful registration
//   const register = async () => {
//     const result = await onRegister(username, password);
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
//           label={"Username"}
//           icon={
//             <MaterialIcons
//               name="alternate-username"
//               size={20}
//               color="#666"
//               style={{ marginRight: 5 }}
//             />
//           }
//           keyboardType="username-address"
//           onChangeText={(text) => setUsername(text)}
//           value={username}
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
import { firstNameValidator } from "../../helpers/firstNameValidator";
import { lastNameValidator } from "../../helpers/lastNameValidator";
import { emailValidator } from "../../helpers/emailValidator";
import { usernameValidator } from "../../helpers/usernameValidator";
import { passwordValidator } from "../../helpers/passwordValidator";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const { onRegister } = useAuth();

  const onSignUpPressed = () => {
    const firstNameError = firstNameValidator(firstName.value);
    const lastNameError = lastNameValidator(lastName.value);
    const emailError = emailValidator(email.value);
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      usernameError ||
      passwordError
    ) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    register();
  };

  //We automatically call the login after a successful registration
  const register = async () => {
    const result = await onRegister(
      username.value,
      password.value,
      firstName.value,
      lastName.value,
      email.value
    );
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
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: "" })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: "" })}
        error={!!lastName.error}
        errorText={lastName.error}
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
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="username"
        keyboardType="username"
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
