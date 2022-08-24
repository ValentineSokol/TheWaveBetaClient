import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/Image';

function Avatar({
  testId, clickHandler, url, alt = 'Avatar image',
}) {
  return <Image testId={testId} url={url} className="Avatar" onClick={clickHandler} alt={alt} />;
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  testId: PropTypes.string,
  clickHandler: PropTypes.func,
};

Avatar.defaultProps = {
  alt: 'Avatar Image',
  testId: '',
  clickHandler: () => {},
};
export default Avatar;
