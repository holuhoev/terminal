import { call, takeLatest, put, select } from 'redux-saga/effects'

import { getNews } from "../../api";
import { LOAD_FAILED, LOAD_SUCCESS, LOAD } from "../reducers/news";
import { selectTerminalId } from "../selectors/terminal";


export default function* main() {
    yield takeLatest(LOAD, fetchNews)
}

function* fetchNews() {
    try {
        const terminalId = yield select(selectTerminalId);
        const newsList   = yield call(getNews, { terminalId });

        yield put({ type: LOAD_SUCCESS, payload: newsList })
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}
