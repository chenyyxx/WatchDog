import React, { Component } from "react";
import { View, Text, Flexbox, StyleSheet, Modal, TouchableHighlight, Alert} from "react-native";
import { MapView } from "expo";

const Marker = MapView.Marker;

export default class Map extends Component {
    render() {
        const { region } = this.props;
        return (
            <MapView
                style={styles.container}
                region={region}
            />
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
});
