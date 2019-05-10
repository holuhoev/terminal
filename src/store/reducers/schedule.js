import { createAction } from "../utils";

export const LOAD_PERSON_NOW_LESSON         = 'terminal/schedule/LOAD_PERSON_NOW_LESSON';
export const LOAD_PERSON_NOW_LESSON_FAIL    = 'terminal/schedule/LOAD_PERSON_NOW_LESSON_FAIL';
export const LOAD_PERSON_NOW_LESSON_SUCCESS = 'terminal/schedule/LOAD_PERSON_NOW_LESSON_SUCCESS';

const initialState = {
    lessons: {
        loading: false,
        error:   null,
        data:    {}
    }
};


const schedule = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_PERSON_NOW_LESSON:
        case LOAD_PERSON_NOW_LESSON_FAIL:
        case LOAD_PERSON_NOW_LESSON_SUCCESS:

            return {
                ...state,
                lessons: lessons(state.lessons, action)
            };

        default:
            return state
    }
};

const lessons = (state = {}, action = {}) => {
    switch (action.type) {

        case LOAD_PERSON_NOW_LESSON:

            return {
                ...state,
                loading: true
            };

        case LOAD_PERSON_NOW_LESSON_SUCCESS:

            return {
                ...state,
                data:    {
                    ...state.data,
                    [action.payload.personId]: action.payload.lessonList
                },
                loading: false
            };

        case LOAD_PERSON_NOW_LESSON_FAIL:

            return {
                ...state,
                error:   action.payload,
                loading: false
            };

        default:
            return state
    }
};

export const loadPersonNowLesson = createAction(LOAD_PERSON_NOW_LESSON);

export default schedule;

