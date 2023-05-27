import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Icon from "react-native-vector-icons/FontAwesome5";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

import { COLORS, IMAGES, ICONS, ROUTES, THEME } from "../constants";

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
        headerStyle: { backgroundColor: THEME.colors.secondary },
        headerTitleStyle: { color: THEME.colors.surface },
        headerShadowVisible: false,
        headerRightContainerStyle: { marginRight: 15 },
        headerRight: () => (
          <ScreenHeaderBtn
            iconUrl={IMAGES.profile}
            handlePress={() => navigation.openDrawer()}
            dimension="100%"
          />
        ),
        backgroundColor: THEME.colors.surface,
      }}
    >
      <Tab.Screen
        name={ROUTES.TASKS}
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ICONS.TabTakenIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.DOCUMENTS}
        component={DocumentStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document-outline"
              color={color}
              size={size}
            />
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
