import { values, map, includes, filter } from "ramda";

import { SERVICE_TYPE_LABELS } from "../reducers/services";
import { selectBuildingNameById } from "./building";


const selectServiceStore = state => state.services;

const getServiceTypeLabel = service => SERVICE_TYPE_LABELS[service.type];

const getServiceForList = state => service => {
    const { buildingId, floor } = service;

    return {
        ...service,
        floorLabel:   floor ? `${ floor } этаж` : '',
        typeLabel:    getServiceTypeLabel(service) || '',
        buildingName: selectBuildingNameById(state)(buildingId) || ''
    }
};

export const selectServiceList = state => {
    return filter(filterService, values(map(getServiceForList(state), selectServiceStore(state).data)));
};

export const filterService = searchQuery => service => {
    if (!searchQuery)
        return true;

    const { typeLabel, title } = service;

    return includes(typeLabel.toLowerCase(), searchQuery) || includes(title.toLowerCase(), searchQuery)
};