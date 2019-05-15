export const selectRoomById = (state, id) => selectRooms(state)[id];

const selectRooms = state => state.rooms.data;