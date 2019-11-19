import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  TextInput,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  Platform,
  ScrollView,
  Switch,
  Slider,
} from 'react-native';
import {StarRatings} from './../../../components/StarRatings';

const placeholderTextColor = '#555';

export default class ReviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Feedback'
  };


  constructor(props) {
    super(props);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    this.state = {
      //Setting the value of the date time
      date: date + '/' + month + '/' + year,
      hadIssue: false,
      issueIsUrgent: false,
      issue: undefined,
      rating: 3,
      review: undefined
    };
  }
  componentDidMount() {
    var that = this;

  }

  render() {
    return (<ImageBackground source={require('./../../../assets/backgrounds/Review.jpg')} style={{
        width: '100%',
        height: '100%'
      }}>
      <View style={styles.container}>

        <View style={styles.bannerBox}>
          <Image resizeMode='contain' style={styles.parkBanner} source={require('./../../../assets/images/Parks&RecreationBanner.png')}/>
        </View>
        <View style={styles.form}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 40}} bounces={false}>
              <Text style={{
                  fontSize: 24
                }}>Review Area</Text>
              <TextInput style={[
                  styles.input, {
                    height: 100,
                    borderColor: this.state.review || this.state.review === undefined ? '#AAA' : '#F00',
                  }
                ]} placeholder="Enter the review here" onChangeText={(review) => this.setState({review})} placeholderTextColor={placeholderTextColor} multiline={true} blurOnSubmit={true}/>
              <View style={styles.starRating}>
                <Text style={{
                    fontSize: 24
                  }}>Review Area</Text>
                <StarRatings cb={(rating) => this.setState({rating})}/>
              </View>
                <Text style={{
                    fontSize: 24
                  }}>Were there any issues?</Text>
                <Switch
                  accessible={true}
                  accessibilityHint={"Select if there were issues at the park"}
                  onValueChange={()=>this.setState({hadIssue: !this.state.hadIssue})}
                  value={this.state.hadIssue}
                  />
                {this.state.hadIssue ? (<View>
                  <Text style={{
                      fontSize: 24
                    }}>What was the issue?</Text>
                  <TextInput style={[
                      styles.input, {
                        height: 100,
                        borderColor: this.state.issue || this.state.issue === undefined ? '#AAA' : '#F00',
                      }
                    ]}
                    placeholder="Enter the issue here"
                    onChangeText={(issue) => this.setState({issue})}
                    placeholderTextColor={placeholderTextColor}
                    value={this.state.issue}
                   multiline={true}
                   blurOnSubmit={true}
                    />
                    <Text style={{
                        fontSize: 24
                      }}>Is this issue urgent?</Text>
                    <Switch
                      accessible={true}
                      accessibilityHint={"Select if the issue was urgent"}
                      onValueChange={()=>this.setState({issueIsUrgent: !this.state.issueIsUrgent})}
                      value={this.state.issueIsUrgent}
                        />

                  </View>) : null}

              <Button style={styles.searchButton} title="Submit" onPress={this.sendIssue.bind(this)}/>
        </ScrollView>
        </View>
      </View>
    </ImageBackground>);
  }

  sendIssue() {
    // TODO: Validation
    console.log('yo');

    if(this.state.review === undefined) {
      this.state.review = null;
    }

    if(this.state.hadIssue && this.state.issue === undefined) {
      this.state.issue = null;
    }

    // Alert
    if(this.state.review && (!this.state.hadIssue || this.state.issue)){

      data = {
        date: this.state.date,
        rating: this.state.rating,
        review: this.state.review,
        hadIssue: this.state.hadIssue,
      }

      if(data.hadIssue) {
        data.issueIsUrgent = this.state.issueIsUrgent;
        data.issue = this.state.issue;
      }

      Alert.alert(
        'Are you sure you are ready to submit?',
        '',
        [
          {text: 'Submit', onPress: this.submit.bind(this)},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }
        ],
        {cancelable: false},
      );
    } else {
      this.setState({});
    }

  }

  submit() {
    // Format data
    data = {
      date: this.state.date,
      rating: this.state.rating,
      review: this.state.review,
      hadIssue: this.state.hadIssue,
    }

    if(data.hadIssue) {
      data.issueIsUrgent = this.state.issueIsUrgent;
      data.issue = this.state.issue;
    }

    // TODO: Implement database call on data
    console.log(data);
    this.props.navigation.pop();
  }
}

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

const headerHeight = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 63 : 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  parkBanner: {
    width: imageWidth,
    height: 100,
    bottom: 20,
    backgroundColor: 'rgba(119, 101, 73, 0.6)'
  },
  bannerBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 2
  },
  starRating: {
    marginVertical: 5
  },
  form: {
    backgroundColor: '#FFFFFFAA',
    flex: 2,
  }
});
