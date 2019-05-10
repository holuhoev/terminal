import { fork } from 'redux-saga/effects'

import person from './person';
import chair from './chair';
import news from './news';
import event from './event';
import announcement from './announcement';
import building from './building';
import schedule from './schedule';
import map from './map';
import device from './device';


export default function* main() {
    yield fork(person);
    yield fork(chair);
    yield fork(news);
    yield fork(event);
    yield fork(announcement);
    yield fork(building);
    yield fork(schedule);
    yield fork(map);
    yield fork(device);
};