import { call, takeLatest, delay, put } from 'redux-saga/effects'
import {
    CHANGE_SEARCH_PARAMS,
    LOAD,
    loadPersons,
    loadPersonsFailed,
    loadPersonsSuccess
} from "../reducers/persons";
import getUsers from "../../api";

function* handleChangePersonsSearchParams(action) {
    // debounce by 150ms
    yield delay(150);
    yield put(loadPersons(action.payload))
}

function* fetchPersons(action) {
    try {
        const data = yield call(getUsers, action.payload);
        yield put(loadPersonsSuccess(data))
    } catch (error) {
        yield put(loadPersonsFailed(error))
    }
}

export default function* main() {
    yield takeLatest(CHANGE_SEARCH_PARAMS, handleChangePersonsSearchParams);
    yield takeLatest(LOAD, fetchPersons)
}