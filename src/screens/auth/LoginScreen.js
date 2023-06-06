import React, { useState } from "react";
// import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import useAuth from "../../hooks/useAuth";

import { COLORS, ROUTES } from "../../constants";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState("Hans@gmail.com");
//   const [password, setPassword] = useState("Test123!");
//   const { onLogin } = useAuth();

//   const login = async () => {
//     const result = await onLogin(username, password);
//     if (result.error) {
//       alert(result.msg);
//     } else {
//       console.log("Successfully logged in");
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
//       <View style={{ paddingHorizontal: 25 }}>
//         <Text
//           style={{
//             fontSize: 28,
//             fontWeight: "500",
//             color: "#333",
//             marginBottom: 30,
//           }}
//         >
//           Login
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

//         <CustomButton label={"Login"} onPress={login} />

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "center",
//             marginBottom: 30,
//           }}
//         >
//           <Text>New to the app?</Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate(ROUTES.REGISTER)}
//           >
//             <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
//               {" "}
//               Register
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/loginComponents/Background";
import Logo from "../../components/loginComponents/Logo";
import Header from "../../components/loginComponents/Header";
import Button from "../../components/loginComponents/Button";
import TextInput from "../../components/loginComponents/TextInput";
import BackButton from "../../components/loginComponents/BackButton";
import { THEME } from "../../constants";
import { usernameValidator } from "../../helpers/usernameValidator";
import { passwordValidator } from "../../helpers/passwordValidator";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState({
    value: "Hans@gmail.com",
    error: "",
  });
  const [password, setPassword] = useState({ value: "Test123!", error: "" });
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin(username.value, password.value);
    if (result.error) {
      alert(result.msg);
    } else {
      console.log("Successfully logged in");
    }
  };

  const onLoginPressed = () => {
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    login();
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welkom Terug.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
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
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Heb je nog geen account? </Text>
        <TouchableOpacity onPress={() => navigation.replace(ROUTES.REGISTER)}>
          <Text style={styles.link}>Registreren</Text>
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
