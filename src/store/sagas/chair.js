import { takeLatest, put, call, delay } from "redux-saga/effects";

import {
    LOAD,
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/chairs";
import { getChairs } from "../../api/";


export default function* main() {
    yield takeLatest(LOAD, fetchChairs)
}

function* fetchChairs() {
    try {
        yield delay(3000);
        const chairList = yield call(getChairs);

        yield put({ type: LOAD_SUCCESS, payload: chairList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}