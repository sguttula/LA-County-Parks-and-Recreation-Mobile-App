import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = null;
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Home',
  };

  async registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  if(PUSH_ENDPOINT) {
    return await fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        }
      }),
    });
  } else {
    return null;
  }

}

componentDidMount() {

  this.registerForPushNotificationsAsync();

  this._notificationSubscription = Notifications.addListener(this._handleNotification);

}

_handleNotification = (notification) => {
  this.setState({notification: notification});
  console.log(notification);
}

  render() {
    return (
        <ImageBackground source={require('./../assets/backgrounds/Home.jpg')} style={styles.container}>
          <View style={styles.container}>
          <ScrollView bounces={false}>
          <View style={[styles.rowHolder, styles.logoBox]}>
            <Image resizeMode='contain' style={styles.parkBanner} source={require('../assets/images/Parks&RecreationBanner.png')} />
          </View>
            <View style={styles.rowHolder}>
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"Find A Park"}
                accessibilityHint={"Search for parks using a city or zip code"}
                onPress={() =>this.props.navigation.push('FindAPark')}>
              <View style={[styles.thinBox, { backgroundColor: "#bbe3a3CC", borderColor: '#FFF', borderWidth: 4, borderBottomWidth: 2}]}>
                <View style={[styles.textWrapper, {backgroundColor: "#bbe3a3"}]}>
                  <Text style={[styles.boxText]}>Find a Park</Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Image source={require('./../assets/icons/search.png')} style={[styles.icon]}/>
                </View>
              </View>
              </TouchableWithoutFeedback>
            </View>

          <View style={styles.rowHolder}>
            <TouchableWithoutFeedback
              accessible={true}
              accessibilityLabel={"Park Locations"}
              accessibilityHint={"Search for parks using a map"}
              onPress={() =>this.props.navigation.push('MapSearch')}>
              <View style={[styles.thinBox, { backgroundColor: '#f8dbb4CC', borderWidth: 2, borderLeftWidth: 4, borderColor: '#FFF'}]}>
                <View style={[styles.textWrapper, {backgroundColor: "#f8dbb4"}]}>
                  <Text style={styles.boxText}>Park Locations</Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Image source={require('./../assets/icons/map.png')} style={[styles.icon]}/>
                </View>
              </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            accessible={true}
            accessibilityLabel={"Programs Registration"}
            accessibilityHint={"View and select park programs"}
            onPress={() =>this.props.navigation.push('Programs')}>
          <View style={[styles.thinBox, { backgroundColor: '#a3ded8CC',borderColor: '#FFF', borderWidth: 2, borderRightWidth: 4, borderBottomWidth: 2}]}>
            <View style={[styles.textWrapper, {backgroundColor: "#a3ded8"}]}>
              <Text style={styles.boxText}> Programs </Text>
            </View>
            <View style={styles.iconWrapper}>
              <Image source={require('./../assets/icons/programs.png')} style={[styles.icon]}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
          </View>

          <View style={styles.rowHolder}>
             <TouchableWithoutFeedback
               accessible={true}
               accessibilityLabel={"Facilities Reservation"}
               accessibilityHint={"View and reserve park facilities"}
               onPress={() =>this.props.navigation.push('Facilities')}>
             <View style={[styles.thinBox, { backgroundColor: '#edb4bdCC',borderColor: '#FFF', borderWidth: 2, borderLefttWidth: 4, borderBottomWidth: 2}]}>
               <View style={[styles.textWrapper, {backgroundColor: "#edb4bd"}]}>
                 <Text style={styles.boxText}> Facilities </Text>
               </View>
               <View style={styles.iconWrapper}>
                 <Image source={require('./../assets/icons/facilities.png')} style={[styles.icon]}/>
               </View>
             </View>
           </TouchableWithoutFeedback>
           <TouchableWithoutFeedback
             accessible={true}
             accessibilityLabel={"Golf"}
             accessibilityHint={"Search for Los Angeles County Golf Courses"}
             onPress={() =>this.props.navigation.push('GolfSearch')}>
            <View style={[styles.thinBox, { backgroundColor: '#c7c3faCC', borderColor: '#FFF', borderWidth: 2, borderBottomWidth: 2, borderRightWidth: 4}]}>
              <View style={[styles.textWrapper, {backgroundColor: "#c7c3fa"}]}>
                <Text style={styles.boxText}> Golf </Text>
              </View>
              <View style={styles.iconWrapper}>
                <Image source={require('./../assets/icons/golf.png')} style={[styles.icon]}/>
              </View>
            </View>
            </TouchableWithoutFeedback>
           </View>
           <View style={styles.rowHolder}>
             <TouchableWithoutFeedback
               accessible={true}
               accessibilityLabel={"Parks Assistant"}
               accessibilityHint={"Get your questions answered by the Parks and Recreation Chat Bot"}
               onPress={() =>this.props.navigation.push('ChatBot')}>
              <View style={[styles.thinBox, { backgroundColor: '#9bcbffCC', borderColor: '#FFF', borderWidth: 2, borderBottomWidth: 4, borderLeftWidth: 4}]}>
                <View style={[styles.textWrapper, {backgroundColor: "#9bcbff"}]}>
                  <Text style={styles.boxText}> Parks Assistant </Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Image source={require('./../assets/icons/chatBot.png')} style={[styles.icon]}/>
                </View>

              </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"Offline Maps"}
                accessibilityHint={"View maps of Los Angeles County Parks"}
                onPress={() =>this.props.navigation.push('Mymaps')}>
                <View style={[styles.thinBox, { backgroundColor: '#98d699CC', borderWidth: 2, borderRightWidth: 4, borderBottomWidth: 4, borderColor: '#FFF', }]}>
                  <View style={[styles.textWrapper, {backgroundColor: "#98d699"}]}>
                    <Text style={styles.boxText}>Offline Maps</Text>
                  </View>
                  <View style={styles.iconWrapper}>
                    <Image source={require('./../assets/icons/downloadedMap.png')} style={[styles.icon]}/>
                  </View>
                </View>
                </TouchableWithoutFeedback>

            </View>
         </ScrollView>
       </View>
        </ImageBackground>
      );
  }
}

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 9 : 0,
  },
  bigText: {
    fontSize: 50,
  },
  rowHolder: {
    // flex: 1,
    height: 170,
    flexDirection: 'row',
  },
  thinBox: {
    flex: 1,
  },
  logoBox: {
    // backgroundColor: "#bbe3a3",
  },
  parkBanner: {
    width: imageWidth,
    height: 100,
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(119, 101, 73, 0.4)',
  },
  boxText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  },
  textWrapper: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#FFF'
  },
  icon: {
    width: 125,
    height: 125,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});
