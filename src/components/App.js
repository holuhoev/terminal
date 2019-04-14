import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainMenuScreen from "./screens/MainMenuScreen";

const MainNavigator = createStackNavigator({
        MainMenu: { screen: MainMenuScreen },
    },
    {
        initialRouteName: 'MainMenu'
    }
);

const App = createAppContainer(MainNavigator);

export default App;