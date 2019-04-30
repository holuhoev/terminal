import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PersonListScreen from "./screens/PersonListScreen";
import NewsListScreen from "./screens/NewsListScreen";
import EventsScreen from "./screens/EventsScreen";
import BuildingMapScreen from "./screens/BuildingMapScreen";
import MainMenuScreen from "./screens/MainMenuScreen";


const MainNavigator = createStackNavigator({
    MainMenu:        { screen: MainMenuScreen },
    PersonList:  { screen: PersonListScreen },
    NewsList:    { screen: NewsListScreen },
    Events:      { screen: EventsScreen },
    BuildingMap: { screen: BuildingMapScreen }
}, {
    initialRouteName: 'MainMenu'
});

const App = createAppContainer(MainNavigator);

export default App;