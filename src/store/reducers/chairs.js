import { prop, indexBy, map } from 'ramda';

import { createAction } from "../utils";

export const LOAD         = 'terminal/chairs/LOAD';
export const LOAD_SUCCESS = 'terminal/chairs/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/chairs/LOAD_FAILED';

const initialState = {
    data:    {},
    idList:  [],
    loading: false,
    error:   null
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD:

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

export const loadChairs = createAction(LOAD);