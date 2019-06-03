import { takeLatest, put, call } from "redux-saga/effects";

import {
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/services";
import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from '../reducers/device'
import { getServices } from "../../api";


export default function* main() {
    yield takeLatest(LOAD_DEVICE_SUCCESS, fetchServices)
}

function* fetchServices(action) {
    try {
        const { buildingId } = action.payload;
        const serviceList = yield call(getServices, buildingId);

        yield put({ type: LOAD_SUCCESS, payload: serviceList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}