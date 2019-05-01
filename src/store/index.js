import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'

import persons from './reducers/persons';
import chairs from './reducers/chairs';
import sagas from './sagas'
import news from "./reducers/news";
import terminal from "./reducers/terminal";
import events from "./reducers/events";
import announcements from "./reducers/announcements";
import map from "./reducers/map";

const rootReducer = combineReducers({
    persons,
    chairs,
    news,
    terminal,
    events,
    announcements,
    map
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export default store;