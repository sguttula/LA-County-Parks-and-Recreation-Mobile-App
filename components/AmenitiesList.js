import React from 'react';
import {  View, StyleSheet, Text, Image, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import { Amenity } from './Amenity';

const dimensions = Dimensions.get('window');
const pageWidth = dimensions.width;

export class AmenitiesList extends React.Component {
  constructor(props){
    super(props);
    if(this.props.chosen === undefined) {
      this.props.chosen = new Set([]);
    }
    // this.getAmenityPaths();
    // this.state = { amenityList: []};
  }



  getAmenityPaths(){
    fetch('https://locator.lacounty.gov/parks/api/TagList?tagType=Park%20Amenities')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          amenityList: responseJson,
        });
      })
      .catch((error) =>{
        console.log(error)
      });
  }


  render() {
    const numColumns = pageWidth > 350 ? 3 : 2;
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={this.props.amenityList}
          renderItem={({item}) => <Amenity source={item.imageURL} visible={this.props.chosen.has(item.tagID)}  amenityID={item.tagID} type={item.tag} onPress={(mark, id) => {
            chosen = this.props.chosen;
            if(mark) {
              chosen.add(id);
            } else {
              chosen.delete(id);
            }

            if(this.props.amenityChosenCB) {
                this.props.amenityChosenCB();
            }

            this.setState({amenitiesChosen: chosen});
          }}/>}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          bounces={false}
        /></View>
    );
  }


}

const imageHeight = 80;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  imageContainer: {
    margin: 20,
    borderRadius: 30,
    width: imageHeight,
    height: imageHeight,
    backgroundColor: 'green'

  },
  image: {
    height: imageHeight,
    width: imageHeight,
  }, typeText: {
    fontSize: 18,
    textAlign: 'center',
  }, checkbox: {
    width: 15,
    height: 15,
    right: 0,
  },

});
