import { call, takeLatest, put } from 'redux-saga/effects'

import { getAnnouncements } from "../../api";
import { LOAD_FAILED, LOAD_SUCCESS, LOAD } from "../reducers/announcements";
import { LOAD_SUCCESS as LOAD_DEVICE_SUCCESS } from "../reducers/device";


export default function* main() {
    yield takeLatest(LOAD, fetchAnnouncements);
    yield takeLatest(LOAD_DEVICE_SUCCESS, fetchAnnouncements);
}

function* fetchAnnouncements(action) {
    try {
        const {id} = action.payload;
        const newsList   = yield call(getAnnouncements, id);

        yield put({ type: LOAD_SUCCESS, payload: newsList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}
