import { indexBy, prop, map, find, propEq, propOr } from "ramda";

import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from './device'
import { calculateCentroid } from "../../utils/map";


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
    const { points, edges, elements } = data;

    return {
        points: indexBy(prop('id'), points),
        elements:  indexBy(prop('id'), map(mapElement(points), elements)),
        edges:  map(mapEdge, edges)
    }
};

const mapElement = points => element => {
    const { coordinates, id, label } = element;

    const centerPointId = propOr('', 'id')(find(propEq('elementId', id))(points));
    const centroid      = calculateCentroid(coordinates);

    return {
        id,
        coordinates,
        label,
        centerPointId,
        textCentroid: centroid
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