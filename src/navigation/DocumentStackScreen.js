import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DocumentScreen from "../screens/home/DocumentScreen";

import CustomHeader from "../components/CustomHeader";

import { ROUTES } from "../constants";

const DocumentStack = createNativeStackNavigator();

const DocumentStackScreen = () => {
  return (
    <DocumentStack.Navigator
      initialRouteName={ROUTES.All_Categories}
      screenOptions={{
        header: (props) => {
          <CustomHeader {...props} />;
        },
      }}
    >
      <DocumentStack.Screen
        name={ROUTES.All_Categories}
        component={DocumentScreen}
      />
    </DocumentStack.Navigator>
  );
};

export default DocumentStackScreen;
