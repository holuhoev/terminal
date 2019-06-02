import { takeLatest, put, call } from "redux-saga/effects";

import {
    LOAD,
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/services";
import { getServices } from "../../api";


export default function* main() {
    yield takeLatest(LOAD, fetchServices)
}

function* fetchServices(action) {
    try {
        const serviceList = yield call(getServices, action.payload);

        yield put({ type: LOAD_SUCCESS, payload: serviceList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}