import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { ERRORS } from './../../../constants/errors';


export default class EventListScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
   headerLeft: <HeaderBackButton onPress={() => navigation.dismiss()} />, // Use title prop to add text
   title: "Chat Bot",
 });

 constructor(props){
   super(props);
   this.state = {
     loading: true,
   }
 }

  render() {
    return (
      <KeyboardAvoidingView style={styles.outerView} enabled>
        {this.state.loading && <ActivityIndicator size="large" color="#2c3e50" style={styles.activityIndicator}/> }
        <WebView style={styles.container}
        source={{uri: 'http://deerbot-63fe4.appspot.com/deerwidgetmobile'}}
        bounces={false}
        onLoad={() => {this.setState({loading : false})}}
        onError={() => {this.setState({loading: false}); ERRORS.fetchFailAlert(this.props.navigation)}}
        scalesPageToFit={false}
        />
      </KeyboardAvoidingView>
      );

  }
}
const headerHeight = 63;
const styles = StyleSheet.create({
  container: {
    marginTop: headerHeight,
    flex: 1,
  },
  outerView: {
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 10,
    top: '45%',
  }
});
