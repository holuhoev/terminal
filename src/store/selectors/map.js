import { reduce, values, findIndex, propEq } from "ramda";
import Graph from "../../utils/graph";
import { selectDevicePointId } from "./device";
import { selectPersonRoom } from "./schedule";
import { ROUTES } from "../../utils/navigation";


export const selectRouteFromDevice = (state, fromScreen, navigationProps) => {
    const destPoint = selectDestinationPoint(state, fromScreen, navigationProps);

    return selectRouteFromDeviceToDestinationPoint(state, destPoint);
};

export const selectDestinationPoint = (state, fromScreen, navigationProps) => {
    const element = selectDestinationElement(state, fromScreen, navigationProps);

    return element ? element.pointId : null
};

export const selectRouteFromDeviceToDestinationPoint = (state, destinationPointId) => {
    if (!destinationPointId) {
        return null;
    }

    const devicePointId = selectDevicePointId(state);
    const vertices      = selectVertices(state);

    const graph = new Graph(vertices);

    return graph.shortestPath(devicePointId.toString(), destinationPointId.toString())
        .concat([devicePointId])
        .reverse()
        .map(selectPointById(state))
        .map(pointToString)
        .join(' ');
};

const selectMapData  = state => state.map.data;
const selectVertices = (state) => reduce(toGraph, {}, selectMapData(state).edges);
const pointToString  = point => `${ point.x },${ point.y }`;
const addVertex      = (vertex, all) => ({ ...(all || {}), [vertex]: 1 });


export const selectSchemes            = state => selectMapData(state).schemes;
export const selectActiveSchemeIndex  = state => findIndex(propEq('id', selectSchemeId(state)))(selectSchemes(state));
export const selectSchemeId           = state => selectSchemes(state)[state.map.buildingSchemeIndex].id;
export const selectElementsBySchemeId = (state, schemeId) => values(selectMapData(state).elements)
    .filter(element => !!element.coordinates && element.buildingSchemeId === schemeId);

export const selectElements  = state => selectElementsBySchemeId(state, selectSchemeId(state));
export const selectPointById = state => pointId => selectPoints(state)[pointId];
export const selectPoints    = (state) => selectMapData(state).points;

const selectElementById = (state, id) => selectMapData(state).elements[id];

export const selectDestinationElement = (state, fromScreen, navigationProps) => {
    switch (fromScreen) {

        case ROUTES.PersonList:
            const room = selectPersonRoom(state, navigationProps.personId);

            return room ? selectElementById(state, room.mapElementId) : null;
        default:
            return null;
    }
};

const toGraph = (vertices, relation) => {
    const vertex_1 = relation[0];
    const vertex_2 = relation[1];

    return {
        ...vertices,
        [vertex_1]: addVertex(vertex_2, vertices[vertex_1]),
        [vertex_2]: addVertex(vertex_1, vertices[vertex_2])
    }
};
