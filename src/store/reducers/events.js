import { createAction } from "../utils";

export const LOAD         = 'terminal/events/LOAD';
export const LOAD_SUCCESS = 'terminal/events/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/events/LOAD_FAILED';

const initialState = {
    data:    [],
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

export const loadEvents = createAction(LOAD);