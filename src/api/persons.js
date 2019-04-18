import axios from 'axios';
import { propOr } from 'ramda';

import { GET_PERSONS } from "../utils/url";


export const getPersons = ({ searchQuery, page }) => {
    console.log("get persons " + searchQuery + " | " + page);

    return axios
        .get(GET_PERSONS, {
            params: {
                fio:  searchQuery,
                page: page
            }
        })
        .then(response => propOr([], 'data', response))
        .catch(err => {
            console.error(`GET ${ GET_PERSONS } ${ err }`);
            return Promise.reject(err);
        })
};