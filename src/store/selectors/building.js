export const selectBuildingById = state => id => state.buildings.data[id];

export const selectBuildingNameById = state => id => selectBuildingById(state)(id) ? selectBuildingById(state)(id).name : null;