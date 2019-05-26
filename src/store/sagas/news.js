import { call, takeLatest, put, select } from 'redux-saga/effects'

import { getNews } from "../../api";
import { LOAD_FAILED, LOAD_SUCCESS, LOAD } from "../reducers/news";
import { selectDeviceId } from "../selectors/device";


export default function* main() {
    yield takeLatest(LOAD, fetchNews)
}

function* fetchNews() {
    try {
        const deviceId = yield select(selectDeviceId);
        const newsList   = yield call(getNews, { deviceId });

        yield put({ type: LOAD_SUCCESS, payload: newsList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}
