import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PersonListScreen from "./screens/PersonListScreen";
import NewsListScreen from "./screens/NewsListScreen";
import EventsScreen from "./screens/EventsScreen";
import BuildingMapScreen from "./screens/BuildingMapScreen";
import HomeScreen from "./screens/HomeScreen";


const MainNavigator = createStackNavigator({
    Home:        { screen: HomeScreen },
    PersonList:  { screen: PersonListScreen },
    NewsList:    { screen: NewsListScreen },
    Events:      { screen: EventsScreen },
    BuildingMap: { screen: BuildingMapScreen }
}, {
    initialRouteName: 'Home'
});

const App = createAppContainer(MainNavigator);

export default App;