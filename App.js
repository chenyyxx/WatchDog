import React from 'react';
import { createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation';
import HomeScreen from './screens/home';
import { Icon, Button } from 'react-native-elements';
import SettingsScreen from './screens/setting';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          var iconName = 'home';
        } else if (routeName === 'Settings') {
          var iconName = 'settings';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={13} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#ADADAD',
    },
    animationEnabled: false,
    swipeEnabled: false,
  });


export default createAppContainer(TabNavigator);
