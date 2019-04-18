import axios from 'axios';
import { propOr } from 'ramda';

import { GET_CHAIRS, GET_PERSONS } from "../utils/url";

export const getPersons = ({ searchQuery, page }) => {

    return axios
        .get(GET_PERSONS, {
            params: {
                fio:  searchQuery,
                page: page
            }
        })
        .then(responseData)
        .catch(err => error('GET', GET_PERSONS)(err))
};

export const getChairs = () => {
    console.log("chair request");

    return axios
        .get(GET_CHAIRS)
        .then(responseData)
        .catch(err => error('GET', GET_CHAIRS)(err))
};

const responseData = response => propOr([], 'data', response);
const error        = (method, endpoint) => err => {
    console.error(`${ method } ${ endpoint } ${ err }`);
    return Promise.reject(err);
};

