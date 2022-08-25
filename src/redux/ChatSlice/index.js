import { createSlice } from '@reduxjs/toolkit';
import { fetchUserChatrooms, fetchDirectChatroom, fetchChatroomById } from '../actions/api/chat';
import { actions as wsActions } from '../WebSocketSlice';

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState: { chatrooms: [], selectedChatroomHistory: null },
  reducers: {
    selectChatroom: (state, { payload }) => {
      state.selectedChatroomId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(wsActions.messageReceived, (
      state,
      { payload: message },
      // eslint-disable-next-line consistent-return
    ) => {
      if (message.type !== 'message') return state;
      if (Number(message.payload.chatId) === Number(state.selectedChatroomId)) {
        state?.selectedChatroomHistory?.messages.push(message.payload);
      }
    });
    builder.addCase(fetchUserChatrooms.fulfilled, (
      state,
      { payload },
    ) => {
      state.chatrooms = payload;
    });
    builder.addCase(fetchDirectChatroom.fulfilled, (
      state,
      { payload: { id, Users, Messages } },
    ) => {
      state.selectedChatroomId = id;
      state.selectedChatroomHistory = { users: Users, messages: Messages };
    });
    builder.addCase(fetchChatroomById.fulfilled, (
      state,
      { payload },
    ) => {
      state.selectedChatroomId = payload.id;
      state.selectedChatroomHistory = { users: payload.Users, messages: payload.Messages };
    });
  },
});

export const chatReducer = chatSlice.reducer;
export const { actions } = chatSlice;
