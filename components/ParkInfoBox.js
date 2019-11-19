import React from 'react';
import {  View, StyleSheet, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Secrets } from './../constants/secrets.js';
import { LoadingImage } from './LoadingImage';
import Maps from './../data/maps.js';


export class ParkInfoBox extends React.Component {

  constructor(props){
    super(props);
    this.image = this.props.image;
    this.map = this.props.map;
    this.location = this.props.location;
    this.parkName = this.props.parkName.toLowerCase();

    let type = this.props.type || 'IMAGE';
    this.state = {type: type, weather: null};
    this.getWeather();
  }


    getWeather(){
      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.props.city + '&APPID=' + Secrets.WEATHERAPIKEY)
        .then((response) => response.json())
        .then((responseJson) => {
          let state = this.state;
          state.weather = responseJson;

          this.setState(state);
        })
        .catch((error) =>{
          console.log(error)
        });
    }

  render() {

    if(this.state.type === 'IMAGE'){
      return (
        <View>
          <View style={styles.bubbleBox}>
            <TouchableWithoutFeedback onPress={()=>{this.setState({type: 'WEATHER'})}}>
              <Image source={require('../assets/icons/weatherBubble.png')} style={styles.bubble} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{this.setState({type: 'MAP'})}}>
              <Image source={require('../assets/icons/mapBubble.png')} style={styles.bubble} />
            </TouchableWithoutFeedback>
          </View>
          <View style={{backgroundColor: 'white'}}>
            <LoadingImage source={{uri: this.image}} style={styles.infoImage} />
          </View>
        </View>
      );
    } else if(this.state.type === 'MAP') {
      return (
        <View>
          <View style={styles.bubbleBox}>
            <TouchableWithoutFeedback onPress={()=>{this.setState({type: 'WEATHER'})}}>
              <Image source={require('../assets/icons/weatherBubble.png')} style={styles.bubble} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{this.setState({type: 'IMAGE'})}}>
              <Image source={require('../assets/icons/imageBubble.png')} style={styles.bubble} />
            </TouchableWithoutFeedback>
          </View>
          <View style={{backgroundColor: 'white',}}>
            {Maps[this.parkName] != undefined && (
              <TouchableWithoutFeedback onPress={()=>{
                  this.props.navigation.navigate('OfflineMap', {
                  park: this.parkName
                })
              }}>
                <Image source={Maps[this.parkName]} style={styles.infoImage} />
              </TouchableWithoutFeedback>
            )}
            {Maps[this.parkName] === undefined && (
              <View style={styles.infoImage}>
                <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%',}}>
                <Text style={{fontSize: 30, fontStyle: 'italic'}}>Image Not Available</Text>
                </View>
              </View>
            )}

          </View>
        </View>
      );
    } else if(this.state.type === 'WEATHER') {
      let weatherType;
      let humidity;
      let windSpeed;
      let temperature, maxtemp, mintemp;
      if(this.state.weather == null){
        weatherType = null;
        humidity = null;
        windSpeed = null;
        temperature = null;
        maxtempt = null;
        mintemp = null;
      } else {
        weatherType = this.state.weather.weather[0].main;
        humidity = this.state.weather.main.humidity;
        windSpeed = this.state.weather.wind.speed;
        temperature = Math.round((this.state.weather.main.temp - 273.15) * 9/5 + 32);
        maxtemp =  Math.round((this.state.weather.main.temp_max - 273.15) * 9/5 + 32);
        mintemp =  Math.round((this.state.weather.main.temp_min- 273.15) * 9/5 + 32);
      }
        // TODO: FIX STYLE SINCE ITS FROM https://hackernoon.com/week-2-with-react-native-building-a-weather-app-ca50fcfcb1e1
        return (
          <View>
            <View style={styles.bubbleBox}>
              <TouchableWithoutFeedback onPress={()=>{this.setState({type: 'IMAGE'})}}>
                  <Image source={require('../assets/icons/imageBubble.png')} style={styles.bubble} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{this.setState({type: 'MAP'})}}>
                <Image source={require('../assets/icons/mapBubble.png')} style={styles.bubble} />
              </TouchableWithoutFeedback>
            </View>
              <View style={[styles.infoImage, {backgroundColor: 'rgba(255, 255, 255)', paddingTop: 50, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#CCC', }]}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 20}}>{this.props.city}</Text>
                  <Text style={{fontSize: 16}}>{weatherType}</Text>
                </View>

                <View style={[styles.weatherMainStats, {flex: 2}]}>
                    <Text style={{fontSize: 27}}>{temperature} &#8457;</Text>
                    <Text style={{fontSize: 20}}>{mintemp} &#8457; - {maxtemp} &#8457;</Text>
                </View>
                <View style={[styles.extraWeatherStats, {flex: 1}]}>
                  <Text style={{fontSize: 16}}>Humidity Percentage: {humidity}%</Text>
                  <Text style={{fontSize: 16}}>Wind: {windSpeed} km/h</Text>
                </View>
              </View>

          </View>
        );
    } else { // weather
      return (
        <View>

        </View>
      );
    }

  }
}


const styles = StyleSheet.create({
  infoBox: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 80,
    marginBottom: 20,
  },
  infoImage: {
    width: '100%',
    height: 250,
  },
  bubbleBox: {
    position: 'absolute', // Does not work on Android
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  bubble: {
    width: 50, height: 50,
  },
  extraWeatherStats: {
    alignItems: 'flex-end',
  },
  weatherMainStats: {
      alignItems: 'center',
  }
});
