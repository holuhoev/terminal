import { values } from "ramda";

const selectUnitStore = state => state.units;

export const selectUnitList = state => {
    return values(selectUnitStore(state).data)
};
