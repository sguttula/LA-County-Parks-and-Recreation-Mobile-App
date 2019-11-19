import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class EventListScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
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
  }
});
