import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Dimensions,
    Image,
    ImageBackground,
    Button,
    FlatList,
    Text,
    Platform,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';

export default class MymapsScreen extends React.Component {

    render() {
        return (
          <View>
     <Image source={require('../../../assets/assets/Maps/Acton_Park.jpg')} style={[styles.image]}/>

        </View>
        )
    }


}
const styles = StyleSheet.create({
    container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode : 'contain'
  },

  });
