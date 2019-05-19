import { takeLatest, put, call } from "redux-saga/effects";

import {
    LOAD,
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/units";
import { getUnits } from "../../api";


export default function* main() {
    yield takeLatest(LOAD, fetchUnits)
}

function* fetchUnits() {
    try {
        const unitList = yield call(getUnits);

        yield put({ type: LOAD_SUCCESS, payload: unitList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}