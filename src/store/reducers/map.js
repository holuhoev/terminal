import { indexBy, prop, map, find, propEq } from "ramda";

import {
    LOAD_SUCCESS as LOAD_DEVICE_SUCCESS
} from './device'
import { calculateCentroid, calculateStairsLines } from "../../utils/map";
import { createAction } from "../utils";


export const LOAD         = 'terminal/map/LOAD';
export const LOAD_SUCCESS = 'terminal/map/LOAD_SUCCESS';
export const LOAD_FAILED  = 'terminal/map/LOAD_FAILED';

export const CHANGE_ACTIVE_SCHEME_INDEX = 'terminal/map/CHANGE_ACTIVE_SCHEME_INDEX';

export const changeActiveSchemeIndex = createAction(CHANGE_ACTIVE_SCHEME_INDEX);

const initialState = {
    loading:             false,
    error:               null,
    data:                {
        schemes:  [],
        points:   {},
        elements: {},
        edges:    []
    },
    buildingSchemeIndex: 0,
    buildingId:          2167
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_ACTIVE_SCHEME_INDEX:

            return {
                ...state,
                buildingSchemeIndex: action.payload
            }

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

    const getFloor    = getFloorByScheme(schemes);
    const elementsObj = indexBy(prop('id'), map(mapElement(getFloor), elements));

    return {
        points:   indexBy(prop('id'), map(mapPoint(elementsObj), points)),
        elements: elementsObj,
        edges:    map(mapEdge, edges),
        schemes:  schemes
    }
};

const mapPoint = elementsObj => point => {
    const { schemeElementId, x, y, id } = point;

    const buildingSchemeId = elementsObj[schemeElementId] ? elementsObj[schemeElementId].buildingSchemeId : null;

    return {
        x,
        y,
        id,
        buildingSchemeId,
        schemeElementId
    }
};


const mapElement = getFloor => element => {
    const { coordinates, id, label, type, buildingSchemeId, pointId } = element;

    const floor        = getFloor(buildingSchemeId);
    const textCentroid = calculateCentroid(coordinates);
    const stairLines   = getStairLines(element);

    return {
        id,
        type,
        coordinates,
        label,
        pointId,
        floor,
        textCentroid,
        buildingSchemeId,
        lines: stairLines
    }
};

const getFloorByScheme = schemes => schemeId => prop('floor')(find(propEq('id', schemeId))(schemes));

const getStairLines = element => {
    if (!isElementIsStair(element))
        return [];

    return calculateStairsLines(element.coordinates)
};

export const isElementIsStair = element => element.type === MAP_ELEMENTS_TYPES.STAIRS;

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