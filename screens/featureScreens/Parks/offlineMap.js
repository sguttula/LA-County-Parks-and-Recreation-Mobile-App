import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,


} from 'react-native';
// for the search bar needs npm install --save react-native-elements
import {SearchBar} from "react-native-elements";
// npm install react-native-pinch-zoom-view --save
import PinchZoomView from 'react-native-pinch-zoom-view';
import Maps from './../../../data/maps';

export default class ImageScreen extends React.Component {
  static navigationOptions = ({ navigation  }) => {

        const {state} = navigation;

        if(state.params != null){
          let park = state.params.park;

          if(park != null){
            park = park.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            return {title: park, headerTitleStyle: {fontSize: 15}}
          } else {
            return {}
          }
        }

    };

  constructor (props) {
    super(props);

    this.state = {}

    this.state.park = this.props.navigation.getParam('park', null).toLowerCase();
    if(this.state.park == null){
      this.props.navigation.pop();
      return;
    }

  }

render() {


    return (

      <PinchZoomView style= {styles.container}>
        <Image source={Maps[this.state.park]} style={styles.image}/>
      </PinchZoomView>

    )
  }


}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',


  },
  image: {
    width: 500,
    height: 500,
    resizeMode : 'contain',

  },
  input: {
    fontSize:10,
    color: 'black',
    textAlign : 'center',
    paddingTop : '1.5%'

  }

  });
