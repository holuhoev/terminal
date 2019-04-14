import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainMenuScreen from "./screens/MainMenuScreen";
import PersonListScreen from "./screens/PersonListScreen";


const MainNavigator = createStackNavigator({
    MainMenu: { screen: MainMenuScreen },
    PersonList: { screen: PersonListScreen },
}, {
    initialRouteName: 'MainMenu'
});

const App = createAppContainer(MainNavigator);

export default App;