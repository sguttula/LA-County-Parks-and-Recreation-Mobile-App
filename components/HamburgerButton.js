import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

export const HamburgerButton = (navigation) => {
  return (
      <TouchableWithoutFeedback onPressIn={() => navigation.toggleDrawer()}>
        <Image source={require('../assets/icons/Hamburger.png')} style={styles.hamburger} />
      </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {

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
