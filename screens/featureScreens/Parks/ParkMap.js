import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  Button,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';
import { TransparentHeader } from './../../../components/TransparentHeader';
import { ParkListing } from './../../../components/ParkListing';
import { StarRatings } from './../../../components/StarRatings';
import { ParkInfoBox } from './../../../components/ParkInfoBox';
import { Secrets } from './../../../constants/secrets.js';
import { AmenitiesList } from './../../../components/AmenitiesList';
import { HeaderBackButton } from 'react-navigation';
import { ERRORS } from './../../../constants/errors';
import { HELPER } from './../../../constants/helper';


const pageSize = 500;
let _this = this
export default class ParkMapScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
   headerLeft: <HeaderBackButton onPress={() => navigation.dismiss()} />, // Use title prop to add text
   title: "Park Locations"
 });
  constructor(props){
    super(props);
    this.getAmenityPaths();
    this.state = {
      amenityList: [],
      region: {
        latitude: 28.78825,
        longitude: -28.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [],
      pageNum: 1,
     amenitiesChosen: new Set(),
     showAmenities: false,
    }

  }

  getAmenityPaths(){
    HELPER.timeout(ERRORS.timeout, fetch('https://locator.lacounty.gov/parks/api/TagList?tagType=Park%20Amenities'))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          amenityList: responseJson,
        });
      })
      .catch((error) =>{
        console.log(error);
        ERRORS.fetchFailAlert(this.props.navigation)
      });
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  getParkData() {
    HELPER.timeout(ERRORS.timeout, fetch('https://locator.lacounty.gov/parks/api/GetLocationList?includeTags=true&includeGeoJSON=true&countyOnly=true&pageSize=1000'))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          parkData: responseJson
        });
        this.getParksNearby();
      })
      .catch((error) =>{
        console.log(error);
        ERRORS.fetchFailAlert(this.props.navigation);
      });
  }

  _getLocationAsync = async () => {
    try {

      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.props.navigation.pop();
      }


      let location = await Location.getCurrentPositionAsync({});
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;
      this.getParkData();
      let state = this.state; // Note: Shallow Copy
      state.region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

      this.setState(state);
    } catch(error) {
      console.log(error)
      // You will be placed here if you do not have permission to access location.
      console.log('Do not have permission to access location')
    }

  };

  getParksNearby() {
    longitude = this.state.region.longitude;
    latitude = this.state.region.latitude;
    const results = this.state.parkData;
    let markers = [];
    for(let result of results){

      let coordinates = JSON.parse(result.geoJSON).coordinates;

      markers.push({
        name: result.name,
        coordinate: {latitude: coordinates[1], longitude: coordinates[0]},
        key: result.locationID,
        amenities: new Set(result.tags.map(obj => obj.tagID))
      })
    }

    let state = this.state; // Note: Shallow Copy
    state.markers = this.state.markers.concat(markers);
    state.pageNum += 1;
    this.setState(state);

  }

  computeTotalParks() {
    total = 0
    for(let marker of this.state.markers) {
      if (Array.from(this.state.amenitiesChosen).every((amenityID) => {
        return marker.amenities.has(amenityID)
      })) {
        total += 1
      }
    }
    return total;
  }

   render() {
     return (
       <View style={styles.container}>
         <MapView
           style={styles.map}
           region={this.state.region}
           loadingEnabled = {true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         moveOnMarkerPress = {true}
         showsUserLocation={true}
         showsCompass={true}
         showsPointsOfInterest = {false}
        >
        {this.state.markers.map(marker =>
          Array.from(this.state.amenitiesChosen).every((amenityID) =>
            marker.amenities.has(amenityID)
        ) ? (
         <Marker
           coordinate={marker.coordinate}
           title={marker.title}
           description={marker.name}
           key={marker.key}
           onCalloutPress={()=>{this.props.navigation.navigate('Park', {
               park: marker.name
             });}}
         >
         <MapView.Callout tooltip style={styles.customView}>
                <View style={styles.calloutText}>
                    <Text style={styles.markerText}>{marker.name}</Text>
                    {/*<Image source={{uri: marker.image}} style={{height: 100}}/>*/}
                </View>
          </MapView.Callout>
       </Marker>
     ): null)}

      </MapView>
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.showAmenities}
      onRequestClose={()=>{}}>
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
      {/*<Button title='Load More' style={styles.loadMoreButton} onPress={()=>this.getParksNearby(this.state.region.longitude,this.state.region.latitude)} />
      <Button title='Choose Amenities' style={styles.loadMoreButton} onPress={()=>this.setState({showAmenities: true})} />*/}
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ showAmenities: true });
          }}>
        <View style={styles.amenitiesButton}>
          <View style={{backgroundColor: '#E68017', borderRadius: 40, width: 40, height: 40, borderColor: 'black', borderWidth: 1}}></View>
          <Text style={{marginLeft: 10, fontSize: 30, color: 'black'}}>Show Amenities</Text>
        </View></TouchableWithoutFeedback>

    </View>
     );
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
 map: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
 },
 calloutText: {
   backgroundColor: 'white',
 },
 loadMoreButton: {
  right: 0,
  bottom: 0,
  zIndex: 10,
},
amenitiesButton: {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  marginBottom: 50,
 },
 modal: {
   backgroundColor: '#bbe3a3',
   paddingTop: 20,
 },
 markerText: {
   fontSize: 20,
   maxWidth: 200,
   textAlign: 'center',
 }
});
