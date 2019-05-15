import { takeLatest, put, call } from "redux-saga/effects";

import {
    LOAD,
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/device";
import { getDevice } from "../../api";


export default function* main() {
    yield takeLatest(LOAD, fetchDevice)
}

function* fetchDevice(action) {
    try {
        const deviceId = action.payload;
        const device   = yield call(getDevice, deviceId);

        yield put({ type: LOAD_SUCCESS, payload: device });
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}