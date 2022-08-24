import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import getRelativeTime from '../../../../utils/getRelativeTime';

function RelativeTime({ text, timestamp }) {
  const [relativeTime, setRelativeTime] = useState(null);
  const updateInterval = useRef(null);

  const updateRelativeTime = () => setRelativeTime(getRelativeTime(timestamp));
  useEffect(() => {
    updateRelativeTime();
    updateInterval.current = setInterval(
      updateRelativeTime,
      1000,
    );
    return () => clearInterval(updateInterval.current);
  }, [timestamp]);
  const result = `${text} ${relativeTime}`;
  return (
    <span className="RelativeTime">
      {' '}
      { !relativeTime ? 'Peering through time...' : result }
    </span>
  );
}

RelativeTime.propTypes = {
  text: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
};

RelativeTime.defaultProps = {
  text: '',
};
export default RelativeTime;
