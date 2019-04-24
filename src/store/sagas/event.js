import { takeLatest, put, call, select } from "redux-saga/effects";

import {
    LOAD,
    LOAD_SUCCESS,
    LOAD_FAILED
} from "../reducers/events";
import { getEvents } from "../../api";
import { selectTerminalId } from "../selectors/terminal";

export default function* main() {
    yield takeLatest(LOAD, fetchEvents)
}

function* fetchEvents() {
    try {
        const terminalId = yield select(selectTerminalId);
        const events     = yield call(getEvents, { terminalId });

        yield put({ type: LOAD_SUCCESS, payload: events })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}