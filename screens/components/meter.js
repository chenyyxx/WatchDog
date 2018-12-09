// Resources:
// 1. https://github.com/bartgryszko/react-native-circular-progress
// 2. https://github.com/nerdyfactory/react-native-simple-gauge
// 3. https://github.com/Reggino/react-svg-gauge
// 4. https://github.com/palerdot/react-d3-speedometer
// 5. https://github.com/arnthor3/react-liquidchart

import React, {Component} from "react";

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {Text,  StyleSheet} from 'react-native'



export default class Meter extends Component {
    render() {
        const fill = 84;
        return (
            <AnimatedCircularProgress
                size={200}
                width={8}
                fill={fill}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                lineCap="round"
            >
                {(fill) => (
                    <Text style={styles.points}>
                        {Math.round(fill)}
                    </Text>
                )}
            </AnimatedCircularProgress>
        );
    }
}

const styles = StyleSheet.create({
    points: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 56,
        left: 50,
        width: 90,
        textAlign: 'center',
        color: '#7591af',
        fontSize: 50,
        fontWeight: "100"
    },
});