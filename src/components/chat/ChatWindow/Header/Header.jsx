import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../reusable/Avatar';
import Heading from '../../../reusable/UIKit/Headings/Heading/Heading';
import { getSelectedChatroom } from '../../../../redux/ChatSlice/selectors';
import DirectChatOnlineDisplay from '../OnlineStatusDisplay/DirectChatOnlineDisplay';
import formatChatroomForDisplay from '../../../../utils/formatChatroomForDisplay';
import './Header.scss';

function Header() {
  const loggedInUser = useSelector((state) => state.global.user);
  const selectedChatroom = useSelector(getSelectedChatroom);

  if (!selectedChatroom) {
    return (
      <div className="ChatSelectionHeading">
        <Heading>Your Chats:</Heading>
      </div>
    );
  }
  const { name, avatarUrl } = formatChatroomForDisplay(selectedChatroom, loggedInUser);
  return (
    <>
      <Avatar url={avatarUrl} />
      <section className="OverlayInfo">
        <Heading size="3">{name}</Heading>
        { selectedChatroom?.directChatroomHash
            && (
            <DirectChatOnlineDisplay
              companionId={selectedChatroom?.members?.[0] || loggedInUser.id}
            />
            )}
      </section>
    </>
  );
}

export default Header;
