import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

import { COLORS, IMAGES, ROUTES } from "../constants";

import TaskScreen from "../screens/home/TaskScreen";
import LeaderboardScreen from "../screens/home/LeaderboardScreen";
import DocumentStackScreen from "./DocumentStackScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#AD40AF" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
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

// import React from "react";

// import Ionicons from "react-native-vector-icons/Ionicons";

// import ProfileScreen from "../screens/ProfileScreen";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import TabNavigator from "./TabNavigator";

// import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

// import { COLORS, images } from "../constants";

// const Stack = createNativeStackNavigator();

// const AuthStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: COLORS.lightWhite },
//         headerShadowVisible: false,
//         headerRight: () => (
//           <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
//         ),
//         headerTitle: "",
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={TabNavigator}
//         options={{
//           drawerIcon: ({ color }) => (
//             <Ionicons name="home-outline" size={22} color={color} />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           drawerIcon: ({ color }) => (
//             <Ionicons name="person-outline" size={22} color={color} />
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AuthStack;
