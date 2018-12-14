import React from "react";
import { View, Text, Image} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";


class InfoScreen extends React.Component {
  render() {
    return (
      <View style={{marginTop: 50}}>
        <Image source={require('../assets/icon.png')} style={{width: 200, height: 200}}/>
        <Text style={{marginLeft:20, marginRight:0}}>By Francis Ma, Yuxiang Chen</Text>
        <Text style={{marginTop:20, marginLeft:20, marginRight:0}}>Due to the limit access to crime data, we only included the data from December 2014 in Minneapolis. The locations of the incidents may not be accurate, and not all incidents are included.</Text>
      </View>
    );
  }
}
export default InfoScreen;
