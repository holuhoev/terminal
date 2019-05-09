
export const selectLessons = state => state.schedule.lessons;

export const selectPersonLessons = (state, personId) => selectLessons(state).data[personId];

export const selectPersonRoomId = (state, personId) => {
    const personLessons = selectPersonLessons(state, personId);

    return listNotEmpty(personLessons) ? personLessons[0].auditoriumId : null;
};

const listNotEmpty = list => !!list && list.length > 0