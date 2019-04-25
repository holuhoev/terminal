import { call, takeLatest, put, select } from 'redux-saga/effects'

import { getAnnouncements } from "../../api";
import { LOAD_FAILED, LOAD_SUCCESS, LOAD } from "../reducers/announcements";
import { selectTerminalId } from "../selectors/terminal";


export default function* main() {
    yield takeLatest(LOAD, fetchAnnouncements)
}

function* fetchAnnouncements() {
    try {
        const terminalId = yield select(selectTerminalId);
        const newsList   = yield call(getAnnouncements, { terminalId });

        yield put({ type: LOAD_SUCCESS, payload: newsList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}
