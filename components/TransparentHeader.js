import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

export const TransparentHeader = (navigation) => {
  return (
    <View style={styles.container}>
      {/*<TouchableWithoutFeedback onPressIn={() => navigation.toggleDrawer()}>
        <Image source={require('../assets/icons/Hamburger.png')} style={styles.hamburger} />
      </TouchableWithoutFeedback>*/}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',

    position: 'absolute',
    top: 0,
    width: '100%',

    justifyContent: 'center',
  },
  infoContainer : {
    width: '100%',
    height: 20
  },
  hamburger: {
    width: 40,
    height: 25,
    marginLeft: 10,
    opacity: 1,
  }
});
