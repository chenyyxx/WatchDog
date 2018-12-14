import React from "react";
import {StyleSheet, View, Text, Alert, Dimensions} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Location, Permissions } from 'expo'
import MapMarker from "react-native-maps/lib/components/MapMarker";
import { MapView } from "expo";

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.00722;
const LONGITUDE_DELTA = LATITUDE_DELTA*ASPECT_RATIO;
import * as Data2014 from '../2014.json';//21532



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
            list.push({
                key: i,
                title: Data2014[i].Description,
                coordinates:{
                    latitude: Data2014[i].Latitude,
                    longitude: Data2014[i].Longitude,
                }
            })
        }
        return list
    };


    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <MapView
                    style={styles.container}
                    showsUserLocation={true}
                    followUserLocation={true}
                    initialRegion={{
                        latitude: 44.940,
                        longitude: -93.165,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }}
                >
                    {this.state.markers.map((marker,index) => (
                        <MapView.Marker
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