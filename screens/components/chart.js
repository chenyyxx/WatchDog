/// Resources:
// 1. https://github.com/JesperLekland/react-native-svg-charts
// 2. https://github.com/capitalone/react-native-pathjs-charts
// 3. https://github.com/tomauty/react-native-chart

import React from "react";
import { StyleSheet, View } from "react-native";
import {VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryLegend} from "victory-native";
import * as Data2014 from '../../2014.json';//21532


export default class Chart extends React.Component {

    render() {
        this.props.data=[
            { x: 1, y: 13000 },
            { x: 2, y: 16500 },
            { x: 3, y: 14250 },
            { x: 4, y: 19000 },
            { x: 5, y: 0},
            { x: 6, y: 0}
        ];
        return (
            <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
                domainPadding={20}
            >
                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6]}
                    tickFormat={["Murder", "Robbery", "Domestic Assault", "Theft","Assault", "Sexual Assault"]}
                    style={{tickLabels: {fontSize: 12, padding: 15,angle:20}}}
                />
                <VictoryAxis
                    dependentAxis
                />
                <VictoryBar
                    data={this.props.data}
                    x="x"
                    y="y"
                    labels={(d) => (d.y).toFixed(2)}
                    style={{
                        labels: { fill: "black" } ,
                        data: {fill: (d) => d.y>0.6 ? "#E74C3C":(d.y > 0.4 ? "#F39C12" :(d.y > 0.2 ? "#F1C40F" :(d.y > 0.1 ? "#1ABC9C" :"#2ECC71")))}
                    }}
                    labelComponent={<VictoryLabel dy={0}/>}
                />
            </VictoryChart>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});
