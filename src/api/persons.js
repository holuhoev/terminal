import _ from "lodash";
import { slice } from "ramda";

import users from "./users";


const contains = ({ name, email }, query) => {
    const { first, last } = name;
    return !!(first.includes(query) || last.includes(query) || email.includes(query));
};

export const getPersons = ({ searchQuery, page }) => {
    console.log("api called " + searchQuery + " | " + page);

    return new Promise((resolve, reject) => {
        if (searchQuery.length === 0) {
            resolve(slice(page * 30, (page + 1) * 30, users));
        } else {
            const formattedQuery = searchQuery.toLowerCase();
            const results        = _.filter(users, user => {
                return contains(user, formattedQuery);
            });
            resolve(slice(page * 30, (page + 1) * 30, results));
        }
    });
};