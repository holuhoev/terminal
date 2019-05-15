import { call, takeLatest, delay, put, select, takeEvery } from 'redux-saga/effects'

import {
    CHANGE_SEARCH_QUERY,
    LOAD,
    LOAD_FAILED,
    LOAD_MORE,
    LOAD_SUCCESS,
} from "../reducers/persons";
import { getPersons } from "../../api";
import { selectCurrentPage } from '../selectors/persons'


export default function* main() {
    yield takeLatest(CHANGE_SEARCH_QUERY, handleChangePersonsSearchQuery);
    yield takeLatest(LOAD, fetchPersons);
    yield takeEvery(LOAD_MORE, fetchPersons);
}

function* handleChangePersonsSearchQuery(action) {
    // debounce by 150ms
    yield delay(150);
    yield put({ type: LOAD, payload: action.payload });
}

function* fetchPersons(action) {
    try {
        const nextPage = yield select(selectCurrentPage);
        const params   = { searchQuery: action.payload, page: nextPage };

        const personList = yield call(getPersons, params);

        yield put({ type: LOAD_SUCCESS, payload: personList });
    } catch (error) {
        yield put({ type: LOAD_FAILED, payload: error })
    }
}