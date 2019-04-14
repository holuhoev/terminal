import { createAction } from "../utils";

export const LOAD                 = 'terminal/persons/LOAD';
export const CHANGE_SEARCH_PARAMS = 'terminal/persons/CHANGE_SEARCH_PARAMS';
const LOAD_SUCCESS                = 'terminal/persons/LOAD_SUCCESS';
const LOAD_FAILED                 = 'terminal/persons/LOAD_FAILED';

const initialState = {
    loading:     false,
    personList:  [],
    searchQuery: '',
    error:       null,
    page:        0
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
                loading:    false,
                personList: action.payload
            };
        case LOAD_FAILED:

            return {
                ...state,
                loading: false,
                error:   action.payload
            };

        case CHANGE_SEARCH_PARAMS:

            return {
                ...state,
                searchQuery: action.payload.searchQuery,
                page:        action.payload.page
            };

        default:
            return state;
    }
};

export default reducer;

export const loadPersons               = createAction(LOAD);
export const changePersonsSearchParams = createAction(CHANGE_SEARCH_PARAMS);
export const loadPersonsSuccess        = createAction(LOAD_SUCCESS);
export const loadPersonsFailed         = createAction(LOAD_FAILED);