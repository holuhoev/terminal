import { values, map } from "ramda";
import Graph from "../../utils/graph";

export const selectRooms = state => {

    return values(state.map.rooms);
};

export const selectPath = (state, from, to) => {
    const vertices = map(room => room.link, state.map.rooms);

    const graph = new Graph(vertices);

    return graph.shortestPath(from, to).concat([from]).reverse();
};