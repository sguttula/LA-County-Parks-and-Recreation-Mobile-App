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
} from 'react-native';
import { CustomButton } from './../../../components/CustomButton';
import { Amenity } from './../../../components/Amenity';
import { AmenitiesList } from './../../../components/AmenitiesList';
import { HeaderBackButton } from 'react-navigation';
import { ERRORS } from './../../../constants/errors';
import { HELPER } from './../../../constants/helper';

const golfAmenities = require('./../../../data/golfAmenities.json');


export default class FindAParkScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
   headerLeft: <HeaderBackButton onPress={() => navigation.dismiss()} />, // Use title prop to add text
   title: "Golf",
 });

  constructor(props) {
    super(props);
    this.state = { isLoading: true, near: '', amenityList: [], amenitiesChosen: new Set([43927]), showAmenities: false, parks: [], isValidSearch: true};
  }

  componentDidMount() {
    // Uncomment following lines (and render lines) to add amenity filtering
    // this.getAmenityPaths();
    // this.loadAmenityData();
  }

  getAmenityPaths(){
    this.setState({
      isLoading: false,
      amenityList: golfAmenities,
      isValidSearch: true
    });
  }

  loadAmenityData(){
    HELPER.timeout(ERRORS.timeout, fetch('https://locator.lacounty.gov/parks/api/GetLocationList?includeTags=true&countyOnly=true&pageSize=1000'))
      .then((response) => response.json())
      .then((results) => {

        let parks = [];
        for(let result of results){
          parks.push({
            amenities: new Set(result.tags.map(obj => obj.tagID))
          })
        }

        this.setState({parks});
      })
      .catch((error) =>{
        console.log(error);
        ERRORS.fetchFailAlert(this.props.navigation);
      });
  }

  computeTotalParks() {
    let total = 0
    for(let marker of this.state.parks) {
      if (Array.from(this.state.amenitiesChosen).every((amenityID) => {
        return marker.amenities.has(amenityID)
      })) {
        total += 1
      }
    }
    return total;
  }

  startSearch() {
    this.setState({isValidSearch: true});
    // Search
    this.props.navigation.push('ParksFound', {
      near: this.state.text,
      amenities: Array.from(this.state.amenitiesChosen)// ['Golf Courses-18 Hole'],
    })
  }

  search() {
    const input = this.state.text;
    if(!input) {
      this.startSearch();
    } else {
      HELPER.timeout(ERRORS.timeout, fetch(`https://locator.lacounty.gov/parks/api/Location?name=${input.trim().split(' ').join('%20')}`))
      .then((response) => response.json())
      .then((responseJson) => {
        if(typeof responseJson == 'string') {
          HELPER.timeout(ERRORS.timeout, fetch(`https://locator.lacounty.gov/parks/api/SuggestWhere?keyword=${input}`))
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.length > 0) {
                this.startSearch();
              } else {
                this.setState({isValidSearch: false});
              }
            })
            .catch((error) =>{
              console.log(error);
              ERRORS.fetchFailAlert(this.props.navigation);
          });
        } else {
          // Park was found
          this.props.navigation.navigate('Park', {
              park: responseJson
          });
        }
      })
      .catch((error) => {
        console.log(error);
        ERRORS.fetchFailAlert(this.props.navigation);
      });
    }
  }


  render() {
    return (
      <ImageBackground source={require('./../../../assets/backgrounds/GolfSearch.jpeg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          {/*
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showAmenities}
          onRequestClose={()=>console.log('close')}>
          <View style={styles.modal}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontSize: 30}}>Total Parks: {this.computeTotalParks()}</Text>
              <Button
                title="Close"
                onPress={() => {
                  let showAmenities = !this.state.showAmenities
                  this.setState({showAmenities});
                }} />
            </View>
            <AmenitiesList amenityList={this.state.amenityList} chosen={this.state.amenitiesChosen} style={styles.amenitiesList} amenityChosenCB={(function(){
                this.setState(this.state);
              }).bind(this)}></AmenitiesList>
          </View>
          </Modal>
          */}
          <View style={styles.bannerBox}>
            <Image resizeMode='contain' style={styles.parkBanner} source={require('./../../../assets/images/Parks&RecreationBanner.png')} />
          </View>
          <KeyboardAvoidingView style={styles.searchBox} behavior="padding" enabled>
            <TextInput
          style={[styles.input, {borderColor: this.state.isValidSearch ? 'black': 'red', borderWidth: this.state.isValidSearch ? 1 : 2}]}
          placeholder="Enter a City/Zip Code"
          placeholderTextColor="#555"
          onChangeText={(text) => this.setState({text})}
        />
      <View style={styles.SearchButtonContainer}>
        {
          CustomButton('Find Golf Courses',
            this.search.bind(this),
            styles.searchButton)
      }
    </View>
          </KeyboardAvoidingView>

          <View style={styles.amenitiesBox}>
         </View>

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
  modal: {
    backgroundColor: '#bbe3a3',
    paddingTop: 20,
    height: '100%',
  },
  parkBanner: {
    width: imageWidth,
    height: 100,
    bottom: 20,
    backgroundColor: 'rgba(244, 226, 88, 0.4)',
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
    borderColor: 'black',
    height: '50%',
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
    flex: 2,
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
  }
});
