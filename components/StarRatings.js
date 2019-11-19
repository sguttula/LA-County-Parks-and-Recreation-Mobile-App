import React from 'react';
import {  View, StyleSheet, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

export class StarRatings extends React.Component {

  constructor(props) {
    super(props);
    this.filledStar = require('./../assets/icons/fullStar.png');
    this.emptyStar = require('./../assets/icons/emptyStar.png');
    numStars =  this.props.starCount || 3;
    this.state = {starCount:  numStars}
  }

  changeStars(stars, score){
    for(let i = 0; i < score; i++){
      stars[i] = (<TouchableWithoutFeedback
        accessible={true}
        accessibilityLabel={"Star Rating Button"}
        accessibilityHint={i + "th star"}
        onPress={()=>{
        this.setState({ starCount: i + 1});
        if(this.props.cb){
          this.props.cb(i+1);
        }
      }} key={i}>
        <Image style={styles.star} source={this.filledStar} />
      </TouchableWithoutFeedback>);
    }

    for(let i = 0 + score; i < 5; i++){
      stars[i] = (<TouchableWithoutFeedback
        accessible={true}
        accessibilityLabel={"Star Rating Button"}
        accessibilityHint={i + "th star"} onPress={()=>{
        this.setState({ starCount: i + 1});
        if(this.props.cb){
          this.props.cb(i+1);
        }

      }} key={i}><Image style={styles.star} source={this.emptyStar}/>
  </TouchableWithoutFeedback>);
    }

  }

  render() {
    numStars = this.props.starCount || 3;
    stars = [null, null, null, null, null];

    this.changeStars(stars, this.state.starCount);

    return (
      <View style={[styles.container, this.props.style]}>
        {stars}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  star: {
    width: 50,
    height: 50,
  }
});
