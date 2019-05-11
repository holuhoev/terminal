import { prop, indexBy, map } from 'ramda';

import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from '../reducers/device'


export const LOAD         = 'terminal/rooms/LOAD';
export const LOAD_SUCCESS = 'terminal/rooms/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/rooms/LOAD_FAILED';

const initialState = {
    data:    {},
    idList:  [],
    loading: false,
    error:   null
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD:
        case LOAD_DEVICE_SUCCESS:

            return {
                ...state,
                loading: true
            };

        case LOAD_SUCCESS:

            return {
                ...state,
                loading: false,
                idList:  map(prop('id'), action.payload),
                data:    indexBy(prop('id'), action.payload)
            };

        case LOAD_FAILED:

            return {
                ...state,
                loading: false,
                error:   action.payload
            };

        default:
            return state
    }
};

export default reducer;