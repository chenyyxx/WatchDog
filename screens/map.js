import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Map from "./components/mapView"

const region = {
    latitude: 37.321996988,
    longitude: -122.0325472123455,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

class MapScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>My Map!!!</Text>
                <Map region={region} />
            </View>
        );
    }
}
export default MapScreen;