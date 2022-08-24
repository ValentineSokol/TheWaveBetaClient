export const getIsLoading = (loadingAction) => (state) => {
  const requestKey = loadingAction.pending.toString();
  return state.loaders.activeRequests.includes(requestKey);
};
export const getIsError = (loadingAction) => (state) => {
  const requestKey = loadingAction.rejected.toString();
  return state.loaders.failedRequests.includes(requestKey);
};
