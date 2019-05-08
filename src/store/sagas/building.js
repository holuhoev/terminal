import { takeLatest, put, call } from "redux-saga/effects";

import {
    LOAD,
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/buildings";
import { getBuildings } from "../../api";


export default function* main() {
    yield takeLatest(LOAD, fetchBuildings)
}

function* fetchBuildings() {
    try {
        const buildings = yield call(getBuildings);

        yield put({ type: LOAD_SUCCESS, payload: buildings })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}