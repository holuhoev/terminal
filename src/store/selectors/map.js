import { values, reduce } from "ramda";
import Graph from "../../utils/graph";
import { selectDevicePointId } from "./device";

export const selectRooms = state => {

    return values(state.map.rooms);
};

export const selectPointById = state => pointId => {
    return selectPoints(state)[pointId];
};

export const selectPoints = (state) => {
    return state.map.points;
};

export const selectRouteFromDevice = (state, to) => {
    if (!to) {
        return ''
    }

    console.log(to);

    const devicePointId = selectDevicePointId(state);
    const vertices      = selectVertices(state);

    const graph = new Graph(vertices);

    return graph.shortestPath(devicePointId, to)
        .concat([devicePointId])
        .reverse()
        .map(selectPointById(state))
        .map(pointToString)
        .join(' ');
};


const pointToString = point => {
    return `${ point.x },${ point.y }`
};

const selectVertices = (state) => {
    return reduce(toGraph, {}, state.map.relations);
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

const addVertex = (vertex, all) => {
    return { ...(all || {}), [vertex]: 1 }
};