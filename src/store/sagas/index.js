import { fork } from 'redux-saga/effects'

import person from './person';
import chair from './chair';


export default function* main() {
    yield fork(person);
    yield fork(chair);
};