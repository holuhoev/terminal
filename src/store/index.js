import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'

import persons from './reducers/persons';
import chairs from './reducers/chairs';
import sagas from './sagas'
import news from "./reducers/news";
import device from "./reducers/device";
import events from "./reducers/events";
import announcements from "./reducers/announcements";
import buildings from "./reducers/buildings";
import map from "./reducers/map";
import schedule from "./reducers/schedule";
import rooms from "./reducers/rooms";
import units from "./reducers/units";
import services from "./reducers/services";

const rootReducer = combineReducers({
    persons,
    chairs,
    news,
    device,
    events,
    announcements,
    map,
    buildings,
    schedule,
    rooms,
    units,
    services

});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export default store;