import axios from 'axios';
import { propOr } from 'ramda';

import {
    GET_ANNOUNCEMENTS, GET_BUILDING_MAP, GET_BUILDINGS,
    GET_CHAIRS, GET_DEVICE,
    GET_EVENTS,
    GET_NEWS,
    GET_PERSON_LESSONS_NOW,
    GET_PERSONS, GET_ROOMS, GET_SERVICES, GET_UNITS
} from "../utils/url";


const responseData = response => propOr([], 'data', response);
const error        = (method, endpoint) => err => {
    console.error(`${ method } ${ endpoint } ${ err }`);
    return Promise.reject(err);
};


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

    return axios
        .get(GET_CHAIRS)
        .then(responseData)
        .catch(error('GET', GET_CHAIRS))
};

export const getNews = ({ deviceId }) => {

    return axios
        .get(GET_NEWS, {
            params: {
                deviceId
            }
        })
        .then(responseData)
        .catch(error('GET', GET_NEWS));
};

export const getEvents = ({ deviceId }) => {
    const getEventsByDevice = `${ GET_EVENTS }/${ deviceId } `;

    return axios
        .get(getEventsByDevice)
        .then(responseData)
        .catch(error('GET', getEventsByDevice));
};

export const getAnnouncements = (id) => {

    return axios
        .get(GET_ANNOUNCEMENTS, {
            params: {
                deviceId: id
            }
        })
        .then(responseData)
        .catch(error('GET', GET_ANNOUNCEMENTS));
};

export const getBuildings = () => {

    return axios
        .get(GET_BUILDINGS)
        .then(responseData)
        .catch(error('GET', GET_CHAIRS));
};

export const getPersonNowLessons = (personId) => {

    return new Promise.resolve([{
        "auditoriumId": 3284,
    }]);
    // return axios
    //     .get(GET_PERSON_LESSONS_NOW, {
    //         params: {
    //             personId
    //         }
    //     })
    //     .then(responseData)
    //     .catch(error('GET', GET_PERSON_LESSONS_NOW));
};

export const getDevice = deviceId => {

    return axios
        .get(`${ GET_DEVICE }/${ deviceId }`)
        .then(responseData)
        .catch(error('GET', GET_DEVICE));
};

export const getBuildingMap = buildingId => {

    return axios
        .get(`${ GET_BUILDING_MAP }/${ buildingId }`)
        .then(responseData)
        .catch(error('GET', GET_BUILDING_MAP));
};


export const getRooms = (buildingId) => {

    return axios
        .get(GET_ROOMS, {
            params: {
                buildingId
            }
        })
        .then(responseData)
        .catch(error('GET', GET_ROOMS))
};

export const getUnits = (buildingId) => {

    return axios
        .get(GET_UNITS, {
            params: {
                buildingId
            }
        })
        .then(responseData)
        .catch(error('GET', GET_UNITS))
};

export const getServices = (buildingId) => {

    return axios
        .get(GET_SERVICES, {
            params: {
                buildingId
            }
        })
        .then(responseData)
        .catch(error('GET', GET_SERVICES))
};