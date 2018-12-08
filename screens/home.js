import React from "react";
import { View, Text, Button, Flexbox } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title : "Home",
  };


  render() {
    return (
        <View>

        <Button
            title = "Settings"
            onPress = {() => this.props.navigation.navigate("Settings")}
        />
        </View>
    );
  }
}
export default HomeScreen;
