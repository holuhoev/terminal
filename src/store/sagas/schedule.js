import { call, takeLatest, put, delay } from 'redux-saga/effects'

import {
    LOAD_PERSON_NOW_LESSON,
    LOAD_PERSON_NOW_LESSON_FAIL,
    LOAD_PERSON_NOW_LESSON_SUCCESS
} from "../reducers/schedule";
import { getPersonNowLessons } from "../../api";


export default function* main() {
    yield takeLatest(LOAD_PERSON_NOW_LESSON, fetchPersonNowLessons);
}

function* fetchPersonNowLessons(action) {
    try {
        yield delay(3000);
        const personId = action.payload;

        const lessons = yield call(getPersonNowLessons, personId);

        console.log("lessons:" + lessons);

        yield put({
            type:    LOAD_PERSON_NOW_LESSON_SUCCESS,
            payload: {
                personId:   personId,
                lessonList: lessons
            }
        })
    } catch (error) {
        yield put({ type: LOAD_PERSON_NOW_LESSON_FAIL, payload: error })
    }
}