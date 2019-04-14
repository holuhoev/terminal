import _ from "lodash";
import users from "./users";

const contains = ({ name, email }, query) => {
    const { first, last } = name;
    return !!(first.includes(query) || last.includes(query) || email.includes(query));
};

export const getUsers = ({ searchQuery = "", page  = 0}) => {
    console.log("api called " + searchQuery + " | " + page);

    return new Promise((resolve, reject) => {
        if (searchQuery.length === 0) {
            resolve(_.take(users, 10));
        } else {
            const formattedQuery = searchQuery.toLowerCase();
            const results        = _.filter(users, user => {
                return contains(user, formattedQuery);
            });
            resolve(_.take(results, 10));
        }
    });
};

export default getUsers;