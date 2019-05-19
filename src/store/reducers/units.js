import { indexBy, prop } from "ramda";
import { createAction } from "../utils";

export const LOAD         = 'terminal/units/LOAD';
export const LOAD_SUCCESS = 'terminal/units/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/units/LOAD_FAILED';

export const CHANGE_SEARCH_QUERY = 'terminal/units/CHANGE_SEARCH_QUERY';

export const changeUnitsSearchQuery = createAction(CHANGE_SEARCH_QUERY);
export const loadUnits              = createAction(LOAD);


const initialState = {
    data:    {},
    loading: false,
    error:   null,
    searchQuery: ''
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
                data:    indexBy(prop('id'), action.payload)
            };

        case LOAD_FAILED:

            return {
                ...state,
                loading: false,
                error:   action.payload
            };

        case CHANGE_SEARCH_QUERY:

            return {
                ...state,
                searchQuery: action.payload
            };

        default:
            return state
    }
};

export default reducer;