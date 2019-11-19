import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  Button,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity
} from 'react-native';
import { CustomButton } from './../../../components/CustomButton';
import { Amenity } from './../../../components/Amenity';
import { AmenitiesList } from './../../../components/AmenitiesList';
import { HeaderBackButton } from 'react-navigation';
import { ERRORS } from './../../../constants/errors';
import { HELPER } from './../../../constants/helper';
import Autocomplete from 'react-native-autocomplete-input';


import Maps from './../../../data/maps';


export default class FindAParkScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
   headerLeft: <HeaderBackButton onPress={() => navigation.dismiss()} />, // Use title prop to add text
   title: "Offline Maps",
 });

  constructor(props) {
    super(props);
    this.state = { isLoading: true, parks: Object.keys(Maps), value: ''};
  }

  _filterData(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return this.capitalizeFirstLetterInEachWord(inputLength === 0 ? [] : this.state.parks.filter(park =>
      park.slice(0, inputLength) === inputValue
    ).slice(0, 5));
  }

  capitalizeFirstLetterInEachWord(arr) {
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return arr.map(toTitleCase);
  }

  _chooseSuggestion(suggestion) {
    this.setState({value: ''});
    this.props.navigation.navigate('OfflineMap', {
        park: suggestion
      });

  }


  render() {
    const data = this._filterData(this.state.value)
    return (
      <ImageBackground source={require('./../../../assets/backgrounds/Maps.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.bannerBox}>
            <Image resizeMode='contain' style={styles.parkBanner} source={require('./../../../assets/images/Parks&RecreationBanner.png')} />
          </View>
          <KeyboardAvoidingView style={styles.searchBox} behavior="padding" enabled>
            <Autocomplete
              inputContainerStyle={{borderWidth: 0}}
              style={styles.input}
              placeholder="Enter the Park Name"
              placeholderTextColor="#555"
              onChangeText={(text) => this.setState({text})}
              data={data}
              defaultValue={this.state.value}
              onChangeText={text=>this.setState({value: text})}
              keyExtractor={(item, index) => index.toString()}
              listContainerStyle={styles.suggestionContainer}
              flatListProps={{bounces: false}}
              renderItem={({ item, i }) => (
                <TouchableOpacity style={styles.suggestion} onPress={() => this._chooseSuggestion(item)}>
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

          </KeyboardAvoidingView>



        </View>
      </ImageBackground>
      );
  }
}

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width ;

const headerHeight = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: headerHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  suggestionContainer: {
    marginHorizontal: 5,
  },
  suggestion: {
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  suggestionText: {
    fontSize: 18,
  },
  modal: {
    backgroundColor: '#bbe3a3',
    paddingTop: 20,
    height: '100%',
  },
  parkBanner: {
    width: imageWidth,
    height: 100,
    bottom: 20,
    marginTop: 25,
    backgroundColor: 'rgba(119, 101, 73, 0.4)',
  },
  bannerBox: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    height: 70,
    paddingHorizontal: 10,
    fontSize: 20,
    color: 'black'
  },
  searchButton: {
    width: imageWidth/2,
    fontSize: 20,
    marginTop: 5,
  },
  searchBox: {
    flex: 5,
    paddingHorizontal: 40,

  },
  amenitiesBox: {
    flex: 3,
    justifyContent: 'center',
  },
  amenitiesButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  SearchButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
