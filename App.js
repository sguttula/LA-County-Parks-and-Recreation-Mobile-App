import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { AppNavigator } from './AppNavigator.js';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
          <AppNavigator />
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // Assets
        require('./assets/images/Parks&RecreationBanner.png'),
        require('./assets/icons/search.png'),
        require('./assets/icons/map.png'),
        require('./assets/icons/downloadedMap.png'),
        require('./assets/icons/chatBot.png'),
        require('./assets/icons/golf.png'),
        require('./assets/icons/chatBot.png'),
        require('./assets/icons/programs.png'),
        require('./assets/icons/facilities.png'),

        // Backgrounds
        require('./assets/backgrounds/Home.jpg'),
        require('./assets/backgrounds/FindAPark.jpg'),
        require('./assets/backgrounds/ParkResults.jpg'),
        require('./assets/backgrounds/Park.jpg'),
        require('./assets/backgrounds/Review.jpg'),
        require('./assets/backgrounds/GolfSearch.jpeg'),
        require('./assets/backgrounds/Facilities.jpg'),
        require('./assets/backgrounds/Programs.jpg'),
        require('./assets/backgrounds/Maps.jpg'),

      ]),
      Font.loadAsync({
        // Example:
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
