import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

export const CustomButton = (text, onPress, secondStyle) => {
  return (
      <TouchableWithoutFeedback
        accessible={true}
        accessibilityLabel={text}
        accessibilityHint={"Button"}
        onPressIn={onPress}>
        <Text style={[styles.container, secondStyle]}>{text}</Text>
      </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 18,
    backgroundColor: '#E68017',
    color: 'white',
    padding: 7,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: screenWidth >= 340 ? 17 : 14,
    marginBottom: 4,
  },
});
