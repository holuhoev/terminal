import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import persons from './reducers/persons';
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'

const rootReducer = combineReducers({
    persons
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export default store;