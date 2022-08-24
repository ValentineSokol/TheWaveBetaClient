import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../reusable/Avatar';
import { getSelectedChatroomId } from '../../../redux/ChatSlice/selectors';
import { actions } from '../../../redux/ChatSlice';
import formatChatroomForDisplay from '../../../utils/formatChatroomForDisplay';

export default function ChatItem({ chatroom }) {
  const selectedChatroomId = useSelector(getSelectedChatroomId);
  const loggedInUser = useSelector((state) => state.global.user);
  const isActive = Number(chatroom.id) === Number(selectedChatroomId);
  const wrapperClassNames = isActive ? 'ChatPaneContent  ChatPaneContentActive' : 'ChatPaneContent';
  const dispatch = useDispatch();
  const selectChatroom = () => !isActive && dispatch(actions.selectChatroom(chatroom.id));

  const { name, avatarUrl, lastMessage } = formatChatroomForDisplay(chatroom, loggedInUser);
  return (
    <div onClick={selectChatroom} className="ChatPane">
      <div className={wrapperClassNames}>
        <Avatar url={avatarUrl} />
        <div className="ChatNameMessage">
          <span className="ChatName">{name}</span>
          {
                        lastMessage
                        && (
                        <div className="LastMessageContainer">
                          <span className="LastMessageAuthor">{`${lastMessage.author.username}:`}</span>
                          <p
                            aria-label={`last message. From ${lastMessage.author.username} `}
                            className="LastMessageText"
                            dangerouslySetInnerHTML={{ __html: lastMessage.text }}
                          />
                        </div>
                        )
                    }

        </div>
      </div>
    </div>
  );
}
