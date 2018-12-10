import React, {Component} from "react";
import { View, Text, Flexbox, StyleSheet, Modal, TouchableHighlight, Alert} from "react-native";
import { Icon, Button } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { HeaderBar } from 'react-native-simple-components';

import Meter from "./components/meter";
import Chart from "./components/chart";
import * as Data2014 from '../2014.json';//21532



const Num1miles = 3;
const radius=0.1;

export default class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      latitude: 44.972,
      longitude: -93.271,
      safetyIndex: 0,
      error: null,
      loading: true,
    };
  }



  getInd(){
    let sum=100;
    for(let i = 0; i < 21532; i++){
      if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
        sum*=0.999988;
      }
    }
    return sum;
  }
    ASLTCount(){
        let sumASLT = 0;
        let currentASLT = 0;
        for (let i = 0 ; i < 21532; i++){
            if (Data2014[i].Offense==="ASLT1"|| Data2014[i].Offense==="ASLT2" || Data2014[i].Offense==="ASLT3" || Data2014[i].Offense==="ASLT4" || Data2014[i].Offense==="DASTR"){
                sumASLT+=1;
                if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
                    currentASLT +=1;
                }
            }
        }
        return (currentASLT-(sumASLT/Num1miles))/(sumASLT/Num1miles);
    }
    DASLTCount(){
        let sumDASLT = 0;
        let currentDASLT = 0;
        for (let i = 0 ; i < 21532; i++){
            if (Data2014[i].Offense==="DASLT1"|| Data2014[i].Offense==="DASLT2" || Data2014[i].Offense==="DASLT3" ){
                sumDASLT+=1;
                if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
                    currentDASLT +=1;
                }
            }
        }
        return (currentDASLT-(sumDASLT/Num1miles))/(sumDASLT/Num1miles);
    }
    TheftCount(){
        let sumTheft = 0;
        let currentTheft = 0;
        for (let i = 0 ; i < 21532; i++){
            if (Data2014[i].Offense==="TMVP"|| Data2014[i].Offense==="COMPUT" || Data2014[i].Offense==="THFTSW" || Data2014[i].Offense==="TBLDG" || Data2014[i].Offense==="TFMV" || Data2014[i].Offense==="TFPER" || Data2014[i].Offense==="COINOP" || Data2014[i].Offense==="BIKETF" || Data2014[i]==="AUTOTH" || Data2014[i]==="THEFT" || Data2014[i]==="MVTHEFT" || Data2014[i]==="ONLTHT"){
                sumTheft+=1;
                if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
                    currentTheft +=1;
                }
            }
        }
        return (currentTheft-(sumTheft/Num1miles))/(sumTheft/Num1miles);
    }
    RobberyCount(){
        let sumRobbery = 0;
        let currentRobbery=0;
        for (let i = 0 ; i < 21532; i++){
            if (Data2014[i].Offense==="ROBBIZ"|| Data2014[i].Offense==="ROBPER" || Data2014[i].Offense==="ROBPAG" || Data2014[i].Offense==="ASLT4" ){
                sumRobbery+=1;
                if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
                    currentRobbery +=1;
                }
            }
        }
        RobberyIndex=(currentRobbery-(sumRobbery/Num1miles))/(sumRobbery/Num1miles);
        return RobberyIndex;
    }
    SexualAssault(){
        let sumSA = 0;
        let currentSA=0;
        for (let i = 0 ; i < 21532; i++){
            if (Data2014[i].Offense==="CSCR" ){
                sumSA+=1;
                if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
                    currentSA +=1;
                }
            }
        }
        SAIndex=(currentSA-(sumSA/Num1miles))/(sumSA/Num1miles);
        return SAIndex;
    }

    murder(){
        let sumMurder = 0;
        let currentMurder=0;
        for (let i = 0 ; i < 21532; i++){
            if (Data2014[i].Offense==="MURDR" ){
                sumMurder+=1;
                if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
                    currentMurder +=1;
                }
            }
        }
        return (currentMurder-(sumMurder/Num1miles))/(sumMurder/Num1miles);
    }


  render() {
    const loading='Loading crime data. This may take a while. The first number will not be accurate!';
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
          { quarter: 1, earnings: this.murder() },
          { quarter: 2, earnings: this.RobberyCount() },
          { quarter: 3, earnings: this.DASLTCount() },
          { quarter: 4, earnings: this.TheftCount() },
          { quarter: 5, earnings: this.ASLTCount() },
          { quarter: 6, earnings: this.SexualAssault() }
      ];
    return (
      <View style={this.state.safetyIndex>80?styles.container_safe:styles.container_dangerous}>
        <Text style={{fontSize:15}}>
          Latitude: {this.state.latitude.toFixed(3)}
        </Text>
        <Text style={{fontSize:15}}>
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
    container_safe: {
      flex: 1,
      backgroundColor: "#82E0AA",
      alignItems: 'center',
      borderTopWidth: 50,
      borderTopColor: '#D5F5E3',
    },
    container_dangerous: {
      flex: 1,
      backgroundColor: "#FF6363",
      alignItems: 'center',
      borderTopWidth: 50,
      borderTopColor: '#D5F5E3',
  },
});
