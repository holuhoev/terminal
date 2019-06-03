import { reduce, values, findIndex, propEq, groupBy, prop, map, mapObjIndexed, filter, last } from "ramda";
import { createSelector } from 'reselect'

import Graph from "../../utils/graph";
import { selectDevicePointId } from "./device";
import { selectPersonPointId } from "./schedule";
import { ROUTES } from "../../utils/navigation";
import { selectUnitPointId, } from "./units";
import { selectServicePointId, selectServicesForMap } from "./services";


const selectMapData            = state => state.map.data;
export const selectElementById = (state, id) => selectMapData(state).elements[id];
const selectEdges              = state => selectMapData(state).edges;

export const selectSchemes            = state => selectMapData(state).schemes;
export const selectActiveSchemeIndex  = state => findIndex(propEq('id', selectSchemeId(state)))(selectSchemes(state));
export const selectSchemeId           = state => selectSchemes(state)[state.map.buildingSchemeIndex].id;
export const selectElementsBySchemeId = (state, schemeId) => {

    return values(selectMapData(state).elements)
        .filter(element => !!element.coordinates && element.buildingSchemeId === schemeId)
};

const selectDestinationElementId = (state, fromScreen, navigationProps) => {
    const pointId = selectDestinationPointId(state, fromScreen, navigationProps);
    const point   = selectPointById(selectPoints(state))(pointId);

    return point ? point.schemeElementId : null;
};

export const selectElements  = (state, fromScreen, navigationProps) => {
    const destinationElementId = selectDestinationElementId(state, fromScreen, navigationProps);

    return selectElementsBySchemeId(state, selectSchemeId(state))
        .map(element => {
            return {
                ...element,
                isActive: element.id === destinationElementId
            }
        });
};
export const selectPointById = points => id => points[id];
export const selectPoints    = (state) => selectMapData(state).points;

const selectDestinationPointId = (state, fromScreen, navigationProps) => {
    switch (fromScreen) {
        case ROUTES.UnitList:
            return selectUnitPointId(state, navigationProps.unitId);

        case ROUTES.ServiceList:
            return selectServicePointId(state, navigationProps.serviceId);

        case ROUTES.PersonList:
            return selectPersonPointId(state, navigationProps.personId);

        default:
            return null;
    }
};

const addVertex               = (vertex, all) => ({ ...(all || {}), [vertex]: 1 });
const toGraph                 = (vertices, relation) => {
    const vertex_1 = relation[0];
    const vertex_2 = relation[1];

    return {
        ...vertices,
        [vertex_1]: addVertex(vertex_2, vertices[vertex_1]),
        [vertex_2]: addVertex(vertex_1, vertices[vertex_2])
    }
};
export const mapGraphSelector = createSelector(
    selectEdges,
    (edges) => {

        return new Graph(reduce(toGraph, {}, edges))
    }
);
const routePointsSelector     = createSelector(
    [
        mapGraphSelector,
        selectDevicePointId,
        selectDestinationPointId,
        selectPoints
    ],
    (graph, startPointId, endPointId, points) => {

        if (!startPointId || !endPointId)
            return null;

        const pointsRoutes = graph.shortestPath(startPointId.toString(), endPointId.toString())
            .concat([startPointId])
            .reverse()
            .map(selectPointById(points));

        return groupBy(prop('buildingSchemeId'))(pointsRoutes);
    }
);
const pointToString           = point => `${ point.x },${ point.y }`;
export const selectRoute      = createSelector(
    [
        routePointsSelector,
        selectSchemeId
    ],
    (routePointsGrouped, schemeId) => {

        if (!routePointsGrouped)
            return null;


        return routePointsGrouped[schemeId]
            ? routePointsGrouped[schemeId]
                .map(pointToString)
                .join(' ')
            : null
    }
);

const selectRouteStartSchemeId      = state => selectPointById(selectPoints(state))(selectDevicePointId(state)).buildingSchemeId;
const routeStairsPointsSelector     = createSelector(
    [
        routePointsSelector,
        selectRouteStartSchemeId
    ],
    (routePointsGrouped, startSchemeId) => {

        if (!routePointsGrouped || values(routePointsGrouped).length < 2) {
            return {}
        }

        return mapObjIndexed((points, schemeId) => {

            return (schemeId === startSchemeId + "")
                ? last(points)
                : points[0]

        }, routePointsGrouped)
    });
export const selectRouteStairsPoint = createSelector(
    [
        routeStairsPointsSelector,
        selectSchemeId
    ],
    (routeStairsPoint, schemeId) => {

        return routeStairsPoint[schemeId];
    }
);

export const schemeServicesSelector = createSelector(
    [
        selectPoints,
        selectServicesForMap,
        selectSchemeId
    ],
    (points, services, schemeId) => {
        const pointList      = values(points);
        const isServicePoint = p => p.buildingSchemeId === schemeId && !!p.serviceType;

        return filter(isServicePoint, map(point => {

            return {
                ...point,
                serviceType: services[point.id]
            }
        }, pointList));
    }
);

export const selectPositionPoint = state => {
    const positionPointId = selectDevicePointId(state);

    return selectPointById(selectPoints(state))(positionPointId)
};