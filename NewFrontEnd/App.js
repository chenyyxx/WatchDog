import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import {Ionicons} from 'react-native-vector-icons/Ionicons';

function HomeScreen() {
  return (
    <View style={styles.root}>
      <Text>Home!</Text>
    </View>
  )
}

function MapScreen() {
  return (
    <View style={styles.root}>
      <Text>Map!</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={styles.root}>
      <Text>Settings!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color ,size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            }else if (route.name === 'Map') {
              iconName = 'map';
            }else if (route.name === 'Settings') {
              iconName = 'info';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={20} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
