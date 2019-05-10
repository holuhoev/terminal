import { takeLatest, put, call } from "redux-saga/effects";

import {
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/map";
import { getBuildingMap } from "../../api";
import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from '../reducers/device'


export default function* main() {
    yield takeLatest(LOAD_DEVICE_SUCCESS, fetchBuildingMap)
}

function* fetchBuildingMap(action) {
    try {
        const { buildingId } = action.payload;
        const buildingMap    = yield call(getBuildingMap, buildingId);

        yield put({ type: LOAD_SUCCESS, payload: buildingMap })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}