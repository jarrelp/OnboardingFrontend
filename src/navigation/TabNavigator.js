import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

import { COLORS, IMAGES, ROUTES, THEME } from "../constants";

import TaskScreen from "../screens/home/TaskScreen";
import LeaderboardScreen from "../screens/home/LeaderboardScreen";
import DocumentStackScreen from "./DocumentStackScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: THEME.colors.surface },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: THEME.colors.secondary,
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerRight: () => (
          <ScreenHeaderBtn
            iconUrl={IMAGES.profile}
            handlePress={() => navigation.openDrawer()}
            dimension="100%"
          />
        ),
      }}
    >
      <Tab.Screen
        name={ROUTES.TASKS}
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.DOCUMENTS}
        component={DocumentStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-note" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.LEADERBOARD}
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

// const TabNavigator = () =>
//   // { navigation }
//   {
//     const [index, setIndex] = React.useState(0);
//     const [routes] = React.useState([
//       {
//         key: "taken",
//         title: "Taken",
//         focusedIcon: "heart",
//         unfocusedIcon: "heart-outline",
//       },
//       { key: "documenten", title: "Documenten", focusedIcon: "album" },
//       {
//         key: "leaderboard",
//         title: "Leaderboard",
//         focusedIcon: "bell",
//         unfocusedIcon: "bell-outline",
//       },
//     ]);

//     const renderScene = BottomNavigation.SceneMap({
//       taken: TaskScreen,
//       documenten: DocumentStackScreen,
//       leaderboard: LeaderboardScreen,
//     });

//     return (
//       <BottomNavigation
//         navigationState={{ index, routes }}
//         onIndexChange={setIndex}
//         renderScene={renderScene}
//       />
//     );
