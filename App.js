import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/context/AuthContext";
import useAuth from "./src/hooks/useAuth";

import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack";

const App = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

export default App;

export const Layout = () => {
  const { isAuthenticatedState } = useAuth();
  return (
    <NavigationContainer>
      {!isAuthenticatedState ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
