import { createAction } from "../utils";


export const LOAD         = 'terminal/news/LOAD';
export const LOAD_SUCCESS = 'terminal/news/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/news/LOAD_FAILED';

const initialState = {
    newsList: [],
    loading:  false,
    error:    null
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
                loading:  false,
                newsList: action.payload
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

export const loadNews = createAction(LOAD);