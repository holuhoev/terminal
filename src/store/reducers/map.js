import { indexBy, prop, map, find, propEq } from "ramda";

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
    floor:   3
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
    const { points, edges, elements, schemes } = data;

    const getFloor = getFloorByScheme(schemes);

    return {
        points:   indexBy(prop('id'), map(mapPoint(getFloor), points)),
        elements: indexBy(prop('id'), map(mapElement(getFloor), elements)),
        edges:    map(mapEdge, edges)
    }
};

const mapPoint = getFloor => point => {
    const { buildingSchemeId, x, y, id } = point;

    const floor = getFloor(buildingSchemeId);

    return {
        x,
        y,
        id,
        floor
    }
};


const mapElement = getFloor => element => {
    const { coordinates, id, label, type, buildingSchemeId, pointId } = element;

    const floor        = getFloor(buildingSchemeId);
    const textCentroid = calculateCentroid(coordinates);

    return {
        id,
        type,
        coordinates,
        label,
        pointId,
        floor,
        textCentroid
    }
};

const getFloorByScheme = schemes => schemeId => prop('floor')(find(propEq('id', schemeId))(schemes));

const mapEdge = edge => {
    const { leftPointId, rightPointId } = edge;

    return [
        leftPointId,
        rightPointId
    ]
};


export const MAP_ELEMENTS_TYPES = {
    ROOM:     'ROOM',
    CORRIDOR: 'CORRIDOR',
    DOOR:     'DOOR',
    STAIRS:   'STAIRS'
};
export default reducer;