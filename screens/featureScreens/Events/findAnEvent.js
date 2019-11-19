import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class FindAnEventScreen extends React.Component {
  static navigationOptions = {
    title: 'FindAnEvent',
  };

  render() {
    return (
        <View style={styles.container}>

        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  }
});
