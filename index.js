import React from "react";
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Config from 'react-native-config';

import App from './src/components/App';
import { name as appName } from './app.json';
import store from "./src/store";

const ReactNativeRedux = () => (
    <Provider store={ store }>
        <App/>
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);

console.log('API_URL: ' + Config.API_URL);