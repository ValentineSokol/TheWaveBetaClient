import { createSlice } from '@reduxjs/toolkit';
import * as chatApi from '../actions/api/chat';
import * as api from '../actions/api';

const loadersSlice = createSlice({
  name: 'LoadersSlice',
  initialState: { activeRequests: [], failedRequests: [] },
  extraReducers: (builder) => {
    const thunksToWatch = { ...chatApi, ...api };
    const thunksKeys = Object.keys(thunksToWatch);
    thunksKeys.forEach((thunkKey) => {
      const thunk = thunksToWatch[thunkKey];
      builder.addCase(thunk.pending, (state) => {
        state.failedRequests = state.failedRequests
          .filter((key) => key !== thunk.rejected.toString());
        const requestKey = thunk.pending.toString();
        if (!state.activeRequests.includes(requestKey)) {
          state.activeRequests.push(requestKey);
        }
      });
      builder.addCase(thunk.rejected, (state) => {
        const errorKey = thunk.rejected.toString();
        state.failedRequests.push(errorKey);
        state.activeRequests = state.activeRequests
          .filter((key) => key !== thunk.pending.toString());
      });
      builder.addCase(thunk.fulfilled, (state) => {
        state.activeRequests = state.activeRequests
          .filter((key) => key !== thunk.pending.toString());
      });
    });
  },
});

export const loadersReducer = loadersSlice.reducer;
export const { actions } = loadersSlice;
