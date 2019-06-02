import { values } from "ramda";
import { selectElementById } from "./map";

const selectUnitStore = state => state.units;

export const selectUnitList = state => {
    return values(selectUnitStore(state).data)
};

export const selectUnitById = (state, id) => selectUnitStore(state).data[id];

export const selectUnitSchemeElementId = (state, id) => selectUnitById(state, id) ? selectUnitById(state, id)['schemeElementId'] : null;

export const selectUnitPointId = (state, id) => {
    const elementId = selectUnitSchemeElementId(state, id);

    return elementId
        ? selectElementById(state, elementId).pointId
        : null;
};

export const selectUnitTitle = (state, id) => {
    const unit = selectUnitById(state, id);
    return unit ? unit.title : null;
};