import React from "react";
import {StyleSheet, View, Text, Dimensions} from "react-native";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.00722;
const LONGITUDE_DELTA = LATITUDE_DELTA*ASPECT_RATIO;
import * as Data2014 from '../2014.json';
import {Header, Icon} from "react-native-elements";
//21532



export default class MapScreen extends React.Component {
    constructor(props){
      super(props);
        this.state = {
            markers: MapScreen.renderList()
        }
    };

    static renderList(){
        let list=[];
        for (let i = 0; i < 21532; i++) {
            let diff= new Date()-new Date(Data2014[i].BeginDate);
            let monthDiff=(parseFloat(diff)/(8.64*Math.pow(10,7)))-5*365;
            if ( monthDiff <= 10.0 ){
                list.push({
                    key: i,
                    title: Data2014[i].Description,
                    coordinates:{
                        latitude: Data2014[i].Latitude,
                        longitude: Data2014[i].Longitude,
                    }
                })
            }
        }
        return list
    };
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


    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Header
                    backgroundColor={"white"}
                    centerComponent={<Text style={this.state.fontLoaded?{fontSize:40, fontFamily:"AW", top:25}:{fontSize:40}}>
                        Watch Dog
                    </Text>}
                />
                <MapView
                    style={styles.container}
                    showsUserLocation={true}
                    followUserLocation={true}
                    initialRegion={{
                        latitude: 44.978399,
                        longitude: -93.271077,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 44.978399,
                            longitude: -93.271077,
                        }}>
                        <View style={styles.radius}>
                            <View style={styles.marker}/>
                        </View>
                    </Marker>
                    {this.state.markers.map((marker,index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        />
                    ))}
                </ MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "80%",
        alignItems: 'center',
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,122,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF',
    },
});