export const selectMainScreenIsLoading = state => {
    return state.chairs.loading
        || state.announcements.loading
        || state.map.loading
        || state.device.loading;
};