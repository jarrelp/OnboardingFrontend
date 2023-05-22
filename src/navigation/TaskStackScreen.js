import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TaskScreen from "../screens/home/TaskScreen";

import { ROUTES } from "../constants";

const TaskStack = createNativeStackNavigator();

const TaskStackScreen = () => {
  return (
    <TaskStack.Navigator>
      <TaskStack.Screen name={ROUTES.TASKS} component={TaskScreen} />
    </TaskStack.Navigator>
  );
};

export default TaskStackScreen;
