import { fork } from 'redux-saga/effects'

import person from './person';
import chair from './chair';
import news from './news';
import event from './event';


export default function* main() {
    yield fork(person);
    yield fork(chair);
    yield fork(news);
    yield fork(event);
};