export const selectLessons = state => state.schedule.lessons;

export const selectPersonLessons = (state, personId) => selectLessons(state).data[personId];

export const selectPersonRoomId = (state, personId) => {
    const personLessons = selectPersonLessons(state, personId);

    return personLessons ? personLessons.auditoriumId : ''
};
