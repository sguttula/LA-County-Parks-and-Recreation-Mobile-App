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
import { ParkListing } from './../../../components/ParkListing';
import { LoadingImage } from './../../../components/LoadingImage';
import { ERRORS } from './../../../constants/errors';
import { HELPER } from './../../../constants/helper';
import Carousel from 'react-native-snap-carousel';

const pageSize = 10;

const dimensions = Dimensions.get('window');
const pageWidth = dimensions.width ;
const pageHeight = dimensions.height;

export default class ParksFoundScreen extends React.Component {
  static navigationOptions =({ navigation  }) => {

        const {state} = navigation;

        if(state.params != null){
          let near = state.params.near;
          if(near){
            return {title: 'Park Results: ' + near, headerTitleStyle: {fontSize: 15}}
          } else {
            return {}
          }
        }

    };

  constructor(props) {
    super(props);
    this.state = { pageNum: 1, dataSource: [], isLoading: false, updating: true}
  }


  // NOTE: If you the city wrong, the api might try to correct it but it wont tell you if it is successful.
  componentDidMount(){
  const near = this.props.navigation.getParam('near', '');
  const count = this.props.navigation.getParam('count', 0);
  const amenitiesChosen = this.props.navigation.getParam('amenities', []);
  let url = 'https://locator.lacounty.gov/parks/api/Search?near=' + near + '&pageSize=' + pageSize + '&countyOnly=true&page=' + this.state.pageNum;
  for(let i = 0; i < amenitiesChosen.length; i++){
    url += '&tags=' + amenitiesChosen[i];
  }

  return fetch(url)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         dataSource: responseJson.results,
         updating: false,
         count: count
       });
     })
     .catch((error) =>{
       console.error(error);
     });
  }

  handleNewPark() {
    this.state.updating = true;
    let pageNum = this.state.pageNum;
    let newState = this.state;
    newState['pageNum'] = pageNum + 1;
    this.setState(newState, ()=>{
      this.getNextParks();
    });
  }

  getNextParks() {
    const near = this.props.navigation.getParam('near', '');
    const amenitiesChosen = this.props.navigation.getParam('amenities', '');

    let url = 'https://locator.lacounty.gov/parks/api/Search?near=' + near + '&pageSize=' + pageSize + '&countyOnly=true'  + '&page=' + this.state.pageNum
    for(let i = 0; i < amenitiesChosen.length; i++){
      url += '&tags=' + amenitiesChosen[i];
    }

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let dataState = this.state;
        dataState['dataSource'] = this.state.dataSource.concat(responseJson.results);
        dataState['updating'] = false
        this.setState(dataState);
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _renderItem ({item, index}) {
    return (
      <TouchableWithoutFeedback
        accessible={true}
        accessibilityLabel={item.name + " button"}
        accessibilityHint={item.description}
        onPress={()=> {this.props.navigation.navigate('Park', {
            park: item
          })}}>

        <View style={styles.slide}>
          <View style={styles.imageWrapper}>
            <LoadingImage source={{uri: item.imgurl}} style={styles.image}/>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{ item.name }</Text>
            </View>
            <View style={styles.cityWrapper}>
              <Text style={styles.city}>{ item.city }, { item.state}</Text>
            </View>
          </View>
          <View style={[styles.parkInformationWrapper, styles.descriptionWrapper]}>
              <Text style={styles.description} ellipsizeMode="tail" numberOfLines={100}>{ item.description }</Text>
          </View>
        </View>
        </TouchableWithoutFeedback>
    );
  }

  render() {
     return (
       <View style={{flex: 1, backgroundColor: '#a7dbf9'}}>
        <View style={styles.resultList}>
          <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.dataSource}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={pageWidth}
              itemWidth={pageWidth*0.8}
              onBeforeSnapToItem={(index) => {
                if(index >= this.state.dataSource.length - 3 && !this.state.updating && this.state.dataSource.length != this.state.count) {
                  this.handleNewPark();
                }
              }}
            />
        </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  resultList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: Platform.OS === 'ios' ? 62 : 80,
  },
  slide: {
    backgroundColor: 'white',
    height: '90%',
    marginTop: '10%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  imageWrapper: {
    flex: 3,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  parkInformationWrapper: {
    flex: 2,

  },
  titleWrapper: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#00000033',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  cityWrapper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#00000033',
    bottom: 0,
    paddingLeft: 5,
  },
  city: {
    color: 'white',
    fontSize: 15,
  },
  descriptionWrapper: {
    marginHorizontal: 10,
  },
  description: {
    fontSize: 18,
    flex: 1, flexWrap: 'wrap'
  }
});
