import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";
import TrafficLocation from "../screens/TrafficLocation";
import Chatbox from "../screens/Chatbox";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Traffic Location") {
            iconName = "location";
          } else if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Chatbox") {
            iconName = "chatbubble";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Traffic Location" component={TrafficLocation} />
      <Tab.Screen name="Chatbox" component={Chatbox} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} />
      
    </Tab.Navigator>
  );
}
