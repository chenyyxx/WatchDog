import React, {Component} from "react";
import { View, Text, Flexbox, StyleSheet, Modal, TouchableHighlight, Alert} from "react-native";
import { Icon, Button } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { HeaderBar } from 'react-native-simple-components';

import Meter from "./components/meter";
import Chart from "./components/chart";
import * as Data2014 from '../2014.json';//21532



export default class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      latitude: 40,
      longitude: 95,
      safetyIndex: 12,
      error: null,
      loading: true,
    };
  }

  getInd(){
    let sum=97;
    for(let i = 0; i < 21532; i++){
      if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<0.1){
        sum*=0.999;
      }
      else{
        console.log(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5));
      }
    }
    console.log(Data2014[1].Latitude);
    return sum;
  }

  render() {
    const loading='Loading Crime Data. The Next Number Is Not Accurate!';
    navigator.geolocation.getCurrentPosition(
  position => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      safetyIndex: this.getInd(),
      loading: false,
    });
  },
  error => Alert.alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);
      const demoData = [
          { quarter: 1, earnings: 13000 },
          { quarter: 2, earnings: 16500 },
          { quarter: 3, earnings: 14250 },
          { quarter: 4, earnings: 19000 }
      ];
    return (
      <View style={styles.container}>
        <Text>
          Latitude: {this.state.latitude.toFixed(3)}
        </Text>
        <Text>
          Longitude: {this.state.longitude.toFixed(3)}
        </Text>
        <View style={{margin:20}}>
            <Meter score={this.state.safetyIndex}/>
        </View>
        <Text style={{fontSize:20}}>
          {this.state.loading?loading:null}
        </Text>
      <View>
        <Chart data={demoData} />
      </View>
        <View>
          <Icon
            name = 'info'
            onPress = {() =>
              Alert.alert(
                'Safety Alert',
                'The index shown is based only on the history crime data in the region and may not be accurate. Always observe your surroundings, and call 911 in emergency.',
                [
                  {text: 'Back'},
                ],
                { cancelable: true }
              )}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#82E0AA",
        alignItems: 'center',
        borderTopWidth: 50,
        borderTopColor: '#D5F5E3',
    },
});
