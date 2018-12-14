import React, {Component} from "react";
import { View, Text, Flexbox, StyleSheet, Modal, TouchableHighlight, Alert, ScrollView} from "react-native";
import { Icon, Button } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { HeaderBar } from 'react-native-simple-components';

import Meter from "./components/meter";
import Chart from "./components/chart";
import * as Data2014 from '../2014.json';//21532



const Num1miles = 3;
const radius=0.1;
const RAD = Math.PI/ 180.0;
const EARTH_RADIUS = 6378137;

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: 44.979,
      longitude: -93.278,
      safetyIndex: 0,
      error: null,
      loading: true,
      fontLoaded:false
    };
  }



  async componentDidMount() {
    await Expo.Font.loadAsync({
      "Melinda": require('../assets/Melinda.ttf'),
      "TH3": require('../assets/TH3_MACHINE.ttf'),
      "AW": require('../assets/AW.ttf'),
      "G": require('../assets/GatsbyFLF.ttf'),
      "GB": require('../assets/GatsbyFLF-Bold.ttf'),
    });
    this.setState({fontLoaded:true});
  }

  getDistance(lng1, lat1, lng2, lat2) {
      let radLat1 = lat1*RAD;
      let radLat2 = lat2*RAD;
      let a = radLat1 - radLat2;
      let b = (lng1 - lng2)*RAD;
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
      s = s * EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
  }

  getInd(){
    let sum=100;
    for(let i = 0; i < 21532; i++){
        if (this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude.Latitude,this.state.longitude,this.state.latitude)<1.0){
            sum*=0.999988
        }
      // if(Math.pow(Math.pow(Data2014[i].Latitude-this.state.latitude,2)+Math.pow(Data2014[i].Longitude-this.state.longitude,2),0.5)<radius){
      //   sum*=0.999988;
      // }
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
    const loading='Loading crime data. This may take a while. The first number will not be accurate!';
      const demoData = [
          { quarter: 1, earnings: this.murder() },
          { quarter: 2, earnings: this.RobberyCount() },
          { quarter: 3, earnings: this.DASLTCount() },
          { quarter: 4, earnings: this.TheftCount() },
          { quarter: 5, earnings: this.ASLTCount() },
          { quarter: 6, earnings: this.SexualAssault() }
      ];
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={this.state.fontLoaded?{fontSize:60, fontFamily:"AW", margin:20}:{fontSize:50}}>
          Watch Dog
          </Text>
          <View>
            <Text style={this.state.fontLoaded?{fontSize:20, fontFamily:"GB"}:{fontSize:20}}>
              Latitude: {this.state.latitude.toFixed(3)}
            </Text>
            <Text style={this.state.fontLoaded?{fontSize:20, fontFamily:"GB"}:{fontSize:20}}>
              Longitude: {this.state.longitude.toFixed(3)}
            </Text>
          </View>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#EAEAEA",
      alignItems: 'center',
      borderTopWidth: 50,
      borderTopColor: '#A3A3A3',
    },

});
