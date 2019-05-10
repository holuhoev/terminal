import { createAction } from "../utils";

import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from './device'


export const LOAD         = 'terminal/announcements/LOAD';
export const LOAD_SUCCESS = 'terminal/announcements/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/announcements/LOAD_FAILED';

const initialState = {
    data:    [],
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
                data:    action.payload
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

export const loadAnnouncements = createAction(LOAD);