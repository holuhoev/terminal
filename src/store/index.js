import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'

import persons from './reducers/persons';
import chairs from './reducers/chairs';
import sagas from './sagas'
import news from "./reducers/news";
import terminal from "./reducers/terminal";

const rootReducer = combineReducers({
    persons,
    chairs,
    news,
    terminal
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export default store;