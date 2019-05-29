import { selectRoomById } from "./rooms";
import { selectElementById } from "./map";

export const selectLessons = state => state.schedule.lessons;

export const selectPersonLessons = (state, personId) => selectLessons(state).data[personId];

export const selectPersonRoomId = (state, personId) => {
    // todo: если нет занятий, то брать из сущности Person.
    const personLessons = selectPersonLessons(state, personId);

    return listNotEmpty(personLessons) ? personLessons[0].auditoriumId : null;
};

const selectPersonRoom = (state, personId) => {
    const roomId = selectPersonRoomId(state, personId);

    return roomId ? selectRoomById(state, roomId) : null;
};

export const selectPersonPointId = (state, personId) => {
    const room = selectPersonRoom(state, personId);

    return room
        ? selectElementById(state, room.mapElementId).pointId
        : null;
};


const listNotEmpty = list => !!list && list.length > 0;