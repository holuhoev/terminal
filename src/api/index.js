import axios from 'axios';
import { propOr } from 'ramda';

import {
    GET_ANNOUNCEMENTS,
    GET_CHAIRS,
    GET_EVENTS,
    GET_NEWS,
    GET_PERSONS,
    GET_TODAY_ANNOUNCEMENTS
} from "../utils/url";

export const getPersons = ({ searchQuery, page }) => {

    return axios
        .get(GET_PERSONS, {
            params: {
                fio:  searchQuery,
                page: page
            }
        })
        .then(responseData)
        .catch(error('GET', GET_PERSONS))
};

export const getChairs = () => {
    console.log("chair request");

    return axios
        .get(GET_CHAIRS)
        .then(responseData)
        .catch(error('GET', GET_CHAIRS))
};

export const getNews = ({ terminalId }) => {
    console.log("news request " + terminalId);

    return axios
        .get(GET_NEWS, {
            params: {
                terminalId
            }
        })
        .then(responseData)
        .catch(error('GET', GET_NEWS));
};

export const getEvents = ({ terminalId }) => {
    const getEventsByTerminal = `${ GET_EVENTS }/${ terminalId } `;

    return axios
        .get(getEventsByTerminal)
        .then(responseData)
        .catch(error('GET', getEventsByTerminal));
};

export const getAnnouncements = ({ terminalId }) => {

    return axios
        .get(GET_ANNOUNCEMENTS, {
            params: {
                terminalId
            }
        })
        .then(responseData)
        .catch(error('GET', GET_ANNOUNCEMENTS));
};


const responseData = response => propOr([], 'data', response);
const error        = (method, endpoint) => err => {
    console.error(`${ method } ${ endpoint } ${ err }`);
    return Promise.reject(err);
};

