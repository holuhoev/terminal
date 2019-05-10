import { indexBy, prop, map, find, propEq } from "ramda";

import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from './device'


export const LOAD         = 'terminal/map/LOAD';
export const LOAD_SUCCESS = 'terminal/map/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/map/LOAD_FAILED';

const initialState = {
    loading: false,
    error:   null,
    data:    {},
    floor:   4

};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case LOAD_DEVICE_SUCCESS:

            return {
                ...state,
                loading: true
            };

        case LOAD_SUCCESS:

            // TODO: нормально размапить
            return {
                ...state,
                data:    mapFromServer(action.payload),
                loading: false
            };

        case LOAD_FAILED:

            return {
                ...state,
                error:   action.payload,
                loading: false
            };

        default:
            return state
    }
};

const mapFromServer = data => {
    const { points, edges, rooms } = data;

    return {
        points: indexBy(prop('id'), points),
        rooms:  map(mapRoom(points), rooms),
        edges:  map(mapEdge, edges)
    }
};

const mapRoom = points => room => {
    const { coordinates, id, number } = room;

    return {
        id,
        coordinates,
        number,
        centerPointId: find(propEq('roomId', id))(points) || ''
    }
};

const mapEdge = edge => {
    const { leftPointId, rightPointId } = edge;

    return [
        leftPointId,
        rightPointId
    ]
};

export default reducer;