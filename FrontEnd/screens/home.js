import React, {Component} from "react";
import {View, Text, Flexbox, StyleSheet, Modal, TouchableHighlight, Alert, ScrollView, Dimensions} from "react-native";
import {Icon, Button, Card, Header} from 'react-native-elements';


import Meter from "./components/meter";
import Chart from "./components/chart";
import * as Data2014 from '../2014.json';
import {VictoryLegend} from "victory-native";
//21532



const Num1miles = 3;
const radius=2000;
const RAD = Math.PI/ 180.0;
const EARTH_RADIUS = 6378137;

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: 44.9279,
      longitude: -93.3087,
      safetyIndex: 10,
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
    Alert.alert(
      'Safety Alert',
      'We consider that any score lower than 80 represent a relatively dangerous region. In the Meter, Green shows the high possiblity of safer surroundings while Red means the region is historically dangerous. However, please note that the index is based only on the history crime data in the region and may not be accurate. Always observe your surroundings, and call 911 in emergency.',
      [
        {text: 'I understand!'},
      ],
      { cancelable: false }
    );
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
        if (this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude,this.state.longitude,this.state.latitude)<radius){
            sum*=0.99992
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
                if(this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude,this.state.longitude,this.state.latitude)<radius){
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
                if(this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude,this.state.longitude,this.state.latitude)<radius){
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
                if(this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude,this.state.longitude,this.state.latitude)<radius){
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
                if(this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude,this.state.longitude,this.state.latitude)<radius){
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
                if(this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude,this.state.longitude,this.state.latitude)<radius){
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
                if(this.getDistance(Data2014[i].Longitude,Data2014[i].Latitude,this.state.longitude,this.state.latitude)<radius){
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
          //latitude: position.coords.latitude,
          //longitude: position.coords.longitude,
          safetyIndex: this.getInd(),
          loading: false,
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const loading='Loading crime data. This may take a while. The first number will not be accurate!';
    const demoData = [
        { x: 1, y: 1+this.murder() },
        { x: 2, y: 1+this.RobberyCount() },
        { x: 3, y: 1+this.DASLTCount() },
        { x: 4, y: 1+this.TheftCount() },
        { x: 5, y: 1+this.ASLTCount() },
        { x: 6, y: 1+this.SexualAssault() }
    ];
    return (
      <ScrollView>
          <Header
              backgroundColor={"white"}
              leftComponent={<Icon
                  name = 'info'
                  onPress = {() =>
                      Alert.alert(
                          'Safety Alert',
                          'We consider that any score lower than 80 represent a relatively dangerous region. In the Meter, Green shows the high possiblity of safer surroundings while Red means the region is historically dangerous. However, please note that the index is based only on the history crime data in the region and may not be accurate. Always observe your surroundings, and call 911 in emergency.',
                          [
                              {text: 'I understand!'},
                          ],
                          { cancelable: false }
                      )}/>}
              centerComponent={<Text style={this.state.fontLoaded?{fontSize:40, fontFamily:"AW", top:25}:{fontSize:40}}>
                  Watch Dog
              </Text>}
              rightComponent={{ icon: 'home', color: 'black' }}
          />
        <View style={styles.container}>
          <View>
            <Text style={this.state.fontLoaded?{fontSize:20, fontFamily:"GB"}:{fontSize:20}}>
              Latitude: {this.state.latitude.toFixed(4)}
            </Text>
            <Text style={this.state.fontLoaded?{fontSize:20, fontFamily:"GB"}:{fontSize:20}}>
              Longitude: {this.state.longitude.toFixed(4)}
            </Text>
          </View>
            <VictoryLegend
                // styles={{margin:10}}
                x={10}
                y={20}
                orientation="horizontal"
                symbolSpacer={3}
                height={40}
                data={[
                    { name: "Very Safe", symbol: { fill: "#2ECC71" } },
                    { name: "Safe", symbol: { fill: "#1ABC9C" } },
                    { name: "Average", symbol: { fill: "#F1C40F" } },
                    { name: "Dangerous", symbol: { fill: "#F39C12" } },
                    { name: "Very Dangerous", symbol:{fill: "#E74C3C"}}
                ]}
            />
          <View >
              <Meter score={this.state.safetyIndex}/>
          </View>
          <Text style={{fontSize:20}}>
            {this.state.loading?loading:null}
          </Text>
          <View style={{margin:20}}>
              <Chart data={demoData} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "white",
      alignItems: 'center',
      borderTopWidth: 20,
      borderTopColor: 'white',
    },
});
