import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavoriteScreen from "../screens/home/DocumentScreen";

import { ROUTES } from "../constants";

const DocumentStack = createNativeStackNavigator();

const DocumentStackScreen = () => {
  return (
    <DocumentStack.Navigator>
      <DocumentStack.Screen
        name={ROUTES.All_Categories}
        component={FavoriteScreen}
      />
    </DocumentStack.Navigator>
  );
};

export default DocumentStackScreen;
