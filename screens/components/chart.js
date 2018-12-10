/// Resources:
// 1. https://github.com/JesperLekland/react-native-svg-charts
// 2. https://github.com/capitalone/react-native-pathjs-charts
// 3. https://github.com/tomauty/react-native-chart

import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import * as Data2014 from '../../2014.json';//21532


export default class Chart extends React.Component {

    render() {
        this.props.data=[
            { quarter: 1, earnings: 13000 },
            { quarter: 2, earnings: 16500 },
            { quarter: 3, earnings: 14250 },
            { quarter: 4, earnings: 19000 },
            { quarter: 5, earnings: 0},
            { quarter: 6, earnings: 0}
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
                />
                <VictoryAxis
                    dependentAxis
                />
                <VictoryBar
                    data={this.props.data}
                    x="quarter"
                    y="earnings"
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
