import { takeLatest, put, call } from "redux-saga/effects";

import {
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/rooms";
import { getRooms } from "../../api/";
import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from '../reducers/device'

export default function* main() {
    yield takeLatest(LOAD_DEVICE_SUCCESS, fetchRooms)
}

function* fetchRooms(action) {
    try {
        const { buildingId } = action.payload;
        const roomList       = yield call(getRooms, buildingId);

        yield put({ type: LOAD_SUCCESS, payload: roomList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}