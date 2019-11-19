import { Alert } from 'react-native';

export const ERRORS =  {

  timeout: 5000,
  fetchFailAlert : (navigation) => {
    Alert.alert(
      'Could not reach server.',
      'Please check your internet connection or try again later.',
      [
        {text: 'Go Back', onPress: navigation.pop},
      ],
      {cancelable: false},
    );
  },
  noAmenitiesSelected : () => {
    Alert.alert(
      'Ooops. You did not choose any amenities.',
      'Please choose at least one amenity before searching.',
      [
        {text: 'Ok', onPress: console.log('Not enough amenities')},
      ],
      {cancelable: false},
    );
  }

};
