import { applyMiddleware, combineReducers, createStore } from 'redux';
import persons from './reducers/persons';
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'

const rootReducer = combineReducers({
    persons
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;