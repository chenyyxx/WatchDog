import React from "react";
import { View, Text, Flexbox, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Icon, Button } from 'react-native-elements';


import Meter from "./components/meter"
import Chart from "./components/chart"

class HomeScreen extends React.Component {
  static navigationOptions =({navigation})=> {
    return {
    headerTitle: "Home",
    };
  };



  render() {
    return (
      <View style={styles.container}>
        <View>
          <Meter score={90} />
        </View>
        <View>
          <Chart />
        </View>
        <View>
          <Icon
            name = 'settings'
            title = "Settings"
            onPress = {() => this.props.navigation.navigate("Settings")}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6e6e6"
    }
});



export default HomeScreen;
