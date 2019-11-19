import React from 'react';
import {  View, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native';

export class Amenity extends React.Component {
  constructor(props){
    super(props);
    this.state = { isSelected: this.props.visible }
    if(this.props.canToggle == false) {
      this.state.isSelected = true
    }


  }

  render() {
    imageURL = 'http://parks.lacounty.gov/wp-content/images/tags/' + this.props.amenityID + '.png';
    // This.props.source is no longer being used as the uri
    return (
      <TouchableWithoutFeedback
        accessible={true}
        accessibilityLabel={this.props.type}
        accessibilityHint={"Amenity Button"}
        onPress={()=>{
          if(this.props.canToggle !== false) {
            this.setState({isSelected: !this.state.isSelected});
            if(this.props.onPress) {
              this.props.onPress(!this.state.isSelected, this.props.amenityID);
            }
          }

      }}>
        <View style={styles.container}>
            <View style={[styles.imageContainer, {backgroundColor: this.state.isSelected ? 'green' : '#c93320'}]}>
              <Image source={{uri: imageURL}} style={styles.image} color="#AAA"/>
            </View>
              <Text style={styles.typeText}>{this.props.type}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

const imageHeight = 80;
const styles = StyleSheet.create({
  container: {
    width: 120,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    margin: 20,
    borderRadius: 30,
    width: imageHeight,
    height: imageHeight,

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
