export const getUserChatrooms = state => state.chat.chatrooms;
export const getSelectedChatroomId = state => state.chat.selectedChatroomId;
export const getSelectedChatroomHistory = state => state.chat.selectedChatroomHistory;
export const getSelectedChatroom = state => state.chat.chatrooms
    .find(room => room.id === state.chat.selectedChatroomId);