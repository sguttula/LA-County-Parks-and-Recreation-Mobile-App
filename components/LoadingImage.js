import React from 'react';
import {  ActivityIndicator, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Amenity } from './Amenity';

const dimensions = Dimensions.get('window');
const pageWidth = dimensions.width;

export class LoadingImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      color: '#3c65bc'
    }
  }

  componentDidMount() {
    if(this.props.color) {
      this.setState({color: this.props.color});
    }
  }


  render() {
    return (
      <View style={[styles.container, this.props.style]}>

      {this.state.loading && <ActivityIndicator size="large" color={this.state.color} style={styles.activityIndicator}/> }
      <Image source={this.props.source} style={styles.actualImage} onLoad={() => {this.setState({loading : false})}}/>

      </View>
    );
  }


}

const imageHeight = 80;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actualImage: {
    height: '100%',
    width: '100%',
  },
  activityIndicator: {
    position: 'absolute',
  }

});
