import React from "react";
import { View, Text, Flexbox, StyleSheet, Modal, TouchableHighlight, Alert} from "react-native";
import { Icon, Button } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { HeaderBar } from 'react-native-simple-components';

import Meter from "./components/meter"
import Chart from "./components/chart"
import * as Data2014 from '../2014.json';


class HomeScreen extends React.Component {

  render() {
      const data2014 = [
          { quarter: 1, earnings: 13000 },
          { quarter: 2, earnings: 16500 },
          { quarter: 3, earnings: 14250 },
          { quarter: 4, earnings: 19000 }
      ];
    return (
      <View style={styles.container}>
        <View style={{margin:20}}>
          <Meter score={90} />
        </View>
        <View>
          <Chart data={data2014} />
        </View>
        <View>
          <Icon
            name = 'info'
            onPress = {() =>
              Alert.alert(
                'Safety Alert',
                'The index shown is based only on the history crime data in the region and may not be accurate. Always observe your surroundings, and call 911 in emergency.',
                [
                  {text: 'Back'},
                ],
                { cancelable: true }
              )
            }

          />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#82E0AA",
        alignItems: 'center',
        borderTopWidth: 50,
        borderTopColor: '#D5F5E3',
    },
});




export default HomeScreen;
