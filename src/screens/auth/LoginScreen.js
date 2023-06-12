import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

import { ROUTES } from "../../constants";

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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState({
    value: "test",
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
};

export default LoginScreen;

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
