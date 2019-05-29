import { values, propEq, prop, find } from 'ramda';

export const selectRoomById = (state, id) => selectRooms(state)[id];

const selectRooms = state => state.rooms.data;

export const selectRoomByPointId = (state, pointId) => {
    const rooms = values(selectRooms(state));

    return prop('id', find(propEq('pointId', pointId))(rooms))
};