const formatChatroomForDisplay = (chatroom, loggedInUser) => {
  const result = {
    name: chatroom.name,
    avatarUrl: chatroom.avatarUrl,
    lastMessage: chatroom.Messages[0],
  };
  const isRoomDirect = chatroom.directChatroomHash;
  if (!isRoomDirect) return result;
  const [companion] = chatroom.members;
  if (!companion) {
    result.name = loggedInUser.username;
    result.avatarUrl = loggedInUser.avatarUrl;
    result.companionId = loggedInUser?.id;
    return result;
  }
  result.name = companion.username;
  result.avatarUrl = companion.avatarUrl;
  result.companionId = companion?.id;
  return result;
};

export default formatChatroomForDisplay;
