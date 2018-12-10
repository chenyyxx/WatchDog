import React from "react";
import {View, Text, Alert} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Map from "./components/mapView"
import { Location, Permissions } from 'expo'


class MapScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: 44.972,
            longitude: -93.271,
            error: null,
            loading: true,
        };
    }

    render() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    loading: false,
                });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        let region = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.00722,
            longitudeDelta: 0.00321
        };
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>My Map</Text>
                <Map region={region} />
            </View>
        );
    }
}
export default MapScreen;