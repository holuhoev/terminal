import { indexBy, prop } from "ramda";
import { createAction } from "../utils";

export const LOAD         = 'terminal/services/LOAD';
export const LOAD_SUCCESS = 'terminal/services/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/services/LOAD_FAILED';

export const CHANGE_SEARCH_QUERY = 'terminal/services/CHANGE_SEARCH_QUERY';

export const changeServicesSearchQuery = createAction(CHANGE_SEARCH_QUERY);
export const loadServices           = createAction(LOAD);

const initialState = {
    data:    {},
    loading: false,
    error:   null,
    searchQuery: ''
};

export const SERVICE_TYPE_LABELS = {
    CAFETERIA:      'Кафетерий',
    LIBRARY:        'Библиотека',
    TYPOGRAPHY:     'Типография',
    MEDICAL_CENTER: 'Медицинское отделение',
    POS:            'Банкомат',
    READING_ROOM:   'Читальный зал',
    COOLER:         'Кулер с водой',
    COMPUTER_CLASS: 'Компьютерный класс',
    PRINTER:        'Принтер',
    TOILET:         'Туалет',
    OTHER:          'Другое'
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