import React, { Component } from "react";
import { View, Text, Flexbox, StyleSheet, Modal, TouchableHighlight, Alert} from "react-native";
import { MapView } from "expo";


const Marker = MapView.Marker;

export default class Map extends Component {
    render() {
        return (
            <MapView
                style={styles.container}
                region={this.props.region}
                >
                <MapView.Marker
                    coordinate={this.props.position}>
                    <View style={styles.radius}>
                        <View style={styles.marker}/>
                    </View>
                </MapView.Marker>
            </MapView>
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
