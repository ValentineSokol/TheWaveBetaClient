import React from 'react';
import PropTypes from 'prop-types';

function Circle({ radius, background, className }) {
  return (
    <div
      className={className}
      style={{
        width: radius, height: radius, borderRadius: '50%', background,
      }}
    />
  );
}
Circle.propTypes = {
  radius: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Circle.defaultProps = {
  className: '',
};
export default Circle;
