import { createAction } from "../utils";

export const LOAD                = 'terminal/persons/LOAD';
export const LOAD_MORE           = 'terminal/persons/LOAD_MORE';
export const CHANGE_SEARCH_QUERY = 'terminal/persons/CHANGE_SEARCH_QUERY';

export const LOAD_SUCCESS = 'terminal/persons/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/persons/LOAD_FAILED';

const initialState = {
    loading:     false,
    personList:  [],
    searchQuery: '',
    error:       null,
    page:        -1
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD:

            return {
                ...state,
                loading: true,
                page:    0
            };

        case  LOAD_MORE:

            return {
                ...state,
                page: state.page + 1
            };

        case LOAD_SUCCESS:

            return {
                ...state,
                loading:    false,
                personList: [...state.personList, ...action.payload]
            };

        case LOAD_FAILED:

            return {
                ...state,
                loading: false,
                error:   action.payload,
                page:    state.page - 1
            };

        case CHANGE_SEARCH_QUERY:

            return {
                ...state,
                searchQuery: action.payload,
                personList:  []
            };

        default:
            return state;
    }
};

export default reducer;

export const loadPersons              = createAction(LOAD);
export const loadMorePersons          = createAction(LOAD_MORE);
export const changePersonsSearchQuery = createAction(CHANGE_SEARCH_QUERY);