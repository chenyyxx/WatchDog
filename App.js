import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/home";
import SettingsScreen from "./screens/setting";
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
