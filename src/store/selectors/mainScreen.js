export const selectMainScreenIsLoading = state => {
    return state.chairs.loading || state.announcements.loading;
};