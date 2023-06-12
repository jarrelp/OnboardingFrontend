import React from "react";

import { ROUTES, THEME } from "../../constants";

import Background from "../../components/loginComponents/Background";
import Logo from "../../components/loginComponents/Logo";
import Header from "../../components/loginComponents/Header";
import Button from "../../components/loginComponents/Button";
import Paragraph from "../../components/loginComponents/Paragraph";

const StartScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>Welkom bij TOP</Header>
      <Paragraph>Op een leuke en uitdagende manier inwerken</Paragraph>
      <Button
        mode="contained"
        color={THEME.colors.primary}
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      >
        Aanmelden
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate(ROUTES.REGISTER)}
      >
        Registreren
      </Button>
    </Background>
  );
};

export default StartScreen;
