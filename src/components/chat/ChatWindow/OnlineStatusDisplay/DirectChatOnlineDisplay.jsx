import React from 'react';
import PropTypes from 'prop-types';
import { useUserOnlineStatus } from '../../../../utils/hooks/useUserOnlineStatuses';
import RelativeTime from '../../../reusable/UIKit/RelativeTime';

function DirectChatOnlineDisplay({ companionId }) {
  const userStatus = useUserOnlineStatus(companionId);
  return (
    <span>
      {userStatus?.online ? 'Online'
        : <RelativeTime text="Last seen" timestamp={userStatus?.lastSeen} />}
    </span>
  );
}

DirectChatOnlineDisplay.propTypes = {
  companionId: PropTypes.number.isRequired,
};
export default DirectChatOnlineDisplay;
