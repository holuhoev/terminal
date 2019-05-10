import { values, reduce } from "ramda";
import Graph from "../../utils/graph";
import { selectDevicePointId } from "./device";
import { selectPersonRoomId } from "./schedule";
import { ROUTES } from "../../utils/navigation";


const selectMapData = state => state.map.data;

const selectVertices = (state) => reduce(toGraph, {}, selectMapData(state).edges);
const pointToString  = point => `${ point.x },${ point.y }`;
const addVertex      = (vertex, all) => ({ ...(all || {}), [vertex]: 1 });

export const selectRooms            = state => values(selectMapData(state).rooms);
export const selectPointById        = state => pointId => selectPoints(state)[pointId];
export const selectPoints           = (state) => selectMapData(state).points;
export const selectDestinationPoint = (state, fromScreen, navigationProps) => {
    const room = selectDestinationRoom(state, fromScreen, navigationProps);

    return room ? room.centerPointId : null
};

export const selectDestinationRoom = (state, fromScreen, navigationProps) => {
    switch (fromScreen) {

        case ROUTES.PersonList:
            const roomId = selectPersonRoomId(state, navigationProps.personId);

            return roomId ? selectMapData(state).rooms[roomId] : null;

        default:
            return null;
    }
};

export const selectRouteFromDevice = (state, fromScreen, navigationProps) => {
    const destPoint = selectDestinationPoint(state, fromScreen, navigationProps);

    return selectRouteFromDeviceToDestinationPoint(state, destPoint);
};

export const selectRouteFromDeviceToDestinationPoint = (state, destinationPoint) => {
    if (!destinationPoint) {
        return null;
    }

    const devicePointId = selectDevicePointId(state);
    const vertices      = selectVertices(state);

    const graph = new Graph(vertices);

    return graph.shortestPath(devicePointId, destinationPoint)
        .concat([devicePointId])
        .reverse()
        .map(selectPointById(state))
        .map(pointToString)
        .join(' ');
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
