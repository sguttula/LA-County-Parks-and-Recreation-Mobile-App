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
  Platform,
  ScrollView,
  Share,
  Alert,
  TouchableOpacity,
  Linking
} from 'react-native';
import { ParkListing } from './../../../components/ParkListing';
import { ParkInfoBox } from './../../../components/ParkInfoBox';
import { StarRatings } from './../../../components/StarRatings';
import { CustomButton } from './../../../components/CustomButton';
import { Amenity } from './../../../components/Amenity';
import { ERRORS } from './../../../constants/errors';
import { HELPER } from './../../../constants/helper';



export default class ParkScreen extends React.Component {
  static navigationOptions = ({ navigation  }) => {

        const {state} = navigation;

        if(state.params != null){
          let park = state.params.park;
          if(park != null){
            return {title: park.name || park, headerTitleStyle: {fontSize: 15}}
          } else {
            return {}
          }
        }

    };

  constructor(props) {
    super(props);
    this.state = { isLoading: false, dataSource: null, park: {} };
    this.state.park = this.props.navigation.getParam('park', null);
    if(this.state.park == null){
      this.props.navigation.pop();
    } else if(typeof this.state.park == "string") {
      this.state.isLoading = true;
    }


  }



  getPark(name) {
      HELPER.timeout(ERRORS.timeout, fetch(`https://locator.lacounty.gov/parks/api/Location?name=${name}`))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({park: responseJson, isLoading: false}, ()=> {
        });
      })
      .catch((error) =>{
        console.log(error);
        ERRORS.fetchFailAlert(this.props.navigation)
      });
  }

  componentDidMount(){
    if(this.state.isLoading) {
      this.getPark(this.state.park);
    }

  }

  _handlePressDirections = () => {
    if(this.state.park.address1) {
      let address = this.state.park.address1 + ", " + this.state.park.city + ", California " + this.state.park.zip;

      let daddr = encodeURIComponent(address);

      if (Platform.OS === 'ios') {
        Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
      } else {
        Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
      }
    }  
  }



  render() {
    if(this.state.isLoading){
      return null;
    }
     return (
      <ImageBackground  source={require('./../../../assets/backgrounds/Park.jpg')} style={[styles.container,{width: '100%', height: '100%'}]}>

        <ScrollView bounces={false}>
        <ParkInfoBox parkName={this.state.park.name} image={this.state.park.imgurl} city={this.state.park.city} navigation={this.props.navigation} style={styles.infoBox}/>
        <View style={styles.parkInformation}>
        <View
          accessible={true}
          accessibilityLabel={this.state.park.name + " Address"}
          accessibilityHint={this.state.park.address1 + ", " + this.state.park.city + ", California " + this.state.park.zip }
           style={[styles.rowContainer]}>
          <Image source={require('./../../../assets/icons/pin.png')} style={{width: 50, height: 80}}/>
          <TouchableOpacity
            onPress={this._handlePressDirections}>
            <View>
              <Text style={styles.parkInfo}>{this.state.park.address1}</Text>
              <Text style={styles.parkInfo}>{this.state.park.city}, CA {this.state.park.zip} </Text>
            </View>
          </TouchableOpacity>
        </View>

          <View
            accessible={false}
            style={styles.dividerLine}/>

          <View
            accessible={true}
            accessibilityLabel={"Park Hours"}
            accessibilityHint={this.state.park.hourList[0] || "Not Available"}
             style={[styles.rowContainer]}>
            <Image source={require('./../../../assets/icons/time.png')} style={{width: 50, height: 50}}/>
            <Text style={styles.parkInfo}>{this.state.park.hourList && this.state.park.hourList[0]}</Text>
          </View>
          <View
            accessible={false}
            style={styles.dividerLine}/>

          <View
            accessible={true}
            accessibilityLabel={"Park Description"}
            accessibilityHint={this.state.park.description}
             style={[styles.rowContainer]}>
            <Text style={styles.parkInfo}>{this.state.park.description}</Text>
          </View>


          <View
            accessible={false}
            style={styles.dividerLine}/>
          {(this.state.park.tags && this.state.park.tags.length > 0 ? <View>
            <View
              accessible={true}
              accessibilityLabel={"Amenities List"}
              accessibilityHint={this.state.park.tags.map(item => item.tag1).join(', ')}
               style={styles.amenitiesBox}>
              <Text style={styles.header}> Amenities: </Text>
                <FlatList
                  data={this.state.park.tags}
                  renderItem={({item}) => <Amenity source={item.imageURL} amenityID={item.tagID} type={item.tag1} canToggle={false}/>}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                />
            </View>

            <View
              accessible={true}
              accessibilityLabel={""}
              accessibilityHint={""}
              style={styles.dividerLine}/>
          </View> : null)}


          <View>
            <View style={[styles.rowContainer, styles.parkRedirectContainer]}>
              { CustomButton('Review', ()=> this.props.navigation.push('Review'), styles.parkRedirect)}
              { CustomButton('Share', ()=> this.share(), styles.parkRedirect)}
            </View>

            <View style={[styles.rowContainer, styles.parkRedirectContainer]}>
            </View>
          </View>
        </View>
        </ScrollView>
      </ImageBackground>
      );
  }

  share(){
    try {
         const result = Share.share({
           message:
             'Check out ' + this.state.park.name + '!',
         })
     } catch (error) {
      alert(error.message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 63 : 80,
  },
  infoBox: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 80,
    marginBottom: 20,
  },
  socialMediaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  parkInformation: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingTop: 5,
    paddingHorizontal: 5,
    flexWrap: 'wrap'
  },
  socialMediaImage: {
    height: 70,
    width: 70,
  },
  infoImage: {
    width: '100%',
    height: 250,
  },
  header: {
    fontWeight: 'bold',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  }, parkRedirectContainer: {
    justifyContent: 'space-around',
  }, parkRedirect: {
    width: '40%',
  },
  amenitiesBox: {
    flex: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dividerLine: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  parkInfo: {
    fontSize: 20,
    marginHorizontal: 30
  }
});
