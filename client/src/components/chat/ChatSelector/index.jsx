import React, { useEffect } from 'react';
import './ChatSelector.scss';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons/faCommentMedical';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../reusable/UIKit/Forms/Button';
import { fetchUserChatrooms } from '../../../redux/actions/api/chat';
import ChatItem from './ChatItem';
import { getSelectedChatroomId, getUserChatrooms } from '../../../redux/ChatSlice/selectors';

function ChatSelector() {
  const dispatch = useDispatch();
  const selectedChatroomId = useSelector(getSelectedChatroomId);
  const chatrooms = useSelector(getUserChatrooms);

  useEffect(() => {
    dispatch(fetchUserChatrooms());
  }, []);
  return (
    <div className={classNames(
      'ChatSelector',
      { Expanded: !selectedChatroomId },
    )}
    >
      {
                chatrooms.map((room) => <ChatItem chatroom={room} />)
            }
      <Button className="CreateChatroomButton">
        <FontAwesomeIcon icon={faCommentMedical} />
        {' '}
        Create chatroom
      </Button>
    </div>
  );
}
export default ChatSelector;
