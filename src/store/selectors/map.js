import { values, map } from "ramda";
import Graph from "../../utils/graph";
import { selectDeviceRoomId } from "./device";

export const selectRooms = state => {

    return values(state.map.rooms);
};

export const selectRouteFromDevice = (state, to) => {
    if (!to) {
        return []
    }

    const deviceRoomId = selectDeviceRoomId(state);

    const vertices = map(room => room.link, state.map.rooms);

    const graph = new Graph(vertices);

    return graph.shortestPath(deviceRoomId, to).concat([from]).reverse();
};