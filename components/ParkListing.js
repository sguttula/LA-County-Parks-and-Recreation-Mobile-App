import React from 'react';
import {  View, StyleSheet, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

export class ParkListing extends React.Component {

  render() {
    let park = this.props.park;
    let name = park.name || "ERROR";
    let description = park.description || "This Park has no description";
    let uri = park.imgurl || 'http://parks.lacounty.gov/wp-content/uploads/2017/01/LACseal.png';
    return (
      <TouchableWithoutFeedback onPress={()=>{ this.props.navigation.navigate('Park', {
          park: park
        });}}>
      <View style={styles.container}>
        <View style={[styles.box, styles.imageContainer]}>
          <Image source={{uri: uri}} style={styles.image}/>
          <Text style={styles.parkName}> {name}</Text>
        </View>
        <View style={[styles.box, styles.descriptionContainer]}>
        <Text ellipsizeMode='middle' style={styles.description}> {description}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const dimensions = Dimensions.get('window');

const imageHeight = 120;
const middleWidth = dimensions.width/8;
const imageWidth = (dimensions.width/2) - (middleWidth/2);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10
  },
  box: {
    height: imageHeight + 40,
    width: '50%'
  },
    imageContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: middleWidth/2,
  },
  image: {
    height: imageHeight,
    width: imageWidth
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    marginLeft: middleWidth/2,
  },
  parkName: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    marginHorizontal: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
  }, description: {
    paddingHorizontal: 10,
    height: imageHeight + 30,
    paddingBottom: 5
  }
});
