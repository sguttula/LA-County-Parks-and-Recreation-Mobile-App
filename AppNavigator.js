import React from 'react';
import HomeScreen from './screens/home';

import FindAParkScreen from './screens/featureScreens/Parks/findAPark';
import ParksFoundScreen from './screens/featureScreens/Parks/parksFound';
import ParkScreen from './screens/featureScreens/Parks/Park';
import ParkMapScreen from './screens/featureScreens/Parks/ParkMap';

import FindAnEventScreen from './screens/featureScreens/Events/findAnEvent';
import EventListScreen from './screens/featureScreens/Events/eventList';

import ReportScreen from './screens/featureScreens/Parks/report';
import ReviewScreen from './screens/featureScreens/Parks/review';

import FindAFacilityScreen from './screens/featureScreens/Facilities/findAPark';

import FindAGolfScreen from './screens/featureScreens/Golf/findAPark';

import FindAProgramScreen from './screens/featureScreens/Programs/findAPark';
import ProgramParksFoundScreen from './screens/featureScreens/Programs/parksFound';

import OfflineMapScreen from './screens/featureScreens/Parks/offlineMap';
import OfflineMapsSearchScreen from './screens/featureScreens/Parks/offlineMapsSearch';

import BotScreen from './screens/featureScreens/Chatbot/bot';


import {
   createStackNavigator,
   createDrawerNavigator,
 } from 'react-navigation';
 import {
   Button,
 } from 'react-native';

const myNavigationOptions = {
  navigationOptions: {
    headerStyle: {backgroundColor: 'rgba(255, 255, 255, 0.6)'},
    headerTransparent: true
  },
}

const FindAParkStack = createStackNavigator({
  FindAPark: FindAParkScreen,
  ParksFound: ParksFoundScreen,
  Park: ParkScreen,
  EventList: EventListScreen,
  Report: ReportScreen,
  Review: ReviewScreen,
  OfflineMap: OfflineMapScreen,
}, myNavigationOptions);

const MapSearchStack = createStackNavigator({
  ParkMap: ParkMapScreen,
  Park: ParkScreen,
  EventList: EventListScreen,
  Report: ReportScreen,
  Review: ReviewScreen,
  OfflineMap: OfflineMapScreen,
}, myNavigationOptions);

const ChatBotStack = createStackNavigator({
  Bot: BotScreen,
}, myNavigationOptions);

const GolfSearchStack = createStackNavigator({
  FindAPark: FindAGolfScreen,
  ParksFound: ParksFoundScreen,
  Park: ParkScreen,
  EventList: EventListScreen,
  Report: ReportScreen,
  Review: ReviewScreen,
  OfflineMap: OfflineMapScreen,
}, myNavigationOptions);

const FacilitySearchStack = createStackNavigator({
  FindAPark: FindAFacilityScreen,
  ParksFound: ParksFoundScreen,
  Park: ParkScreen,
  EventList: EventListScreen,
  Report: ReportScreen,
  Review: ReviewScreen,
  OfflineMap: OfflineMapScreen,
}, myNavigationOptions);

const ProgramSearchStack = createStackNavigator({
  FindAPark: FindAProgramScreen,
  ParksFound: ProgramParksFoundScreen,
}, myNavigationOptions);

const OfflineMapsStack = createStackNavigator({
  OfflineMapsSearch: OfflineMapsSearchScreen,
  OfflineMap: OfflineMapScreen,
}, myNavigationOptions);



export const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  FindAPark: FindAParkStack,
  GolfSearch: GolfSearchStack,
  MapSearch: MapSearchStack,
  ChatBot: ChatBotStack,
  Mymaps: OfflineMapsStack,
  Programs: ProgramSearchStack,
  Facilities: FacilitySearchStack,
}, {
  headerMode: 'none',
});
