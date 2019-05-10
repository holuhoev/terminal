import { createAction } from "../utils";

export const LOAD         = 'terminal/events/LOAD';
export const LOAD_SUCCESS = 'terminal/events/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/events/LOAD_FAILED';

const initialState = {
    data:    {},
    error:   null,
    loading: false
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
                data: action.payload
            };

        case LOAD_FAILED:

            return {
                ...state,
                error: action.payload
            };

        default:
            return state
    }
};

export const loadDevice = createAction(LOAD);

export default reducer;