import { createAction } from "../utils";

export const LOAD         = 'terminal/device/LOAD';
export const LOAD_SUCCESS = 'terminal/device/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/device/LOAD_FAILED';

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
                data:    action.payload,
                loading: false
            };

        case LOAD_FAILED:

            return {
                ...state,
                error:   action.payload,
                loading: false
            };

        default:
            return state
    }
};

export const loadDevice = createAction(LOAD);

export default reducer;