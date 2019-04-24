import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainMenuScreen from "./screens/MainMenuScreen";
import PersonListScreen from "./screens/PersonListScreen";
import NewsListScreen from "./screens/NewsListScreen";
import EventsScreen from "./screens/EventsScreen";


const MainNavigator = createStackNavigator({
    MainMenu:   { screen: MainMenuScreen },
    PersonList: { screen: PersonListScreen },
    NewsList:   { screen: NewsListScreen },
    Events:     { screen: EventsScreen }
}, {
    initialRouteName: 'MainMenu'
});

const App = createAppContainer(MainNavigator);

export default App;