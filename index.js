import React from "react";
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import './src/utils/axios';
import App from './src/components/App';
import { name as appName } from './app.json';
import store from "./src/store";


moment.locale('ru');

const ReactNativeRedux = () => (
    <Provider store={ store }>
        <App/>
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);