import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetcher from '../../../utils/fetcher';
import defaultImage from '../../../assets/defaultAvatar.webp';
import './Image.scss';

function Image({
  testId, url, alt, className, onClick,
}) {
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [isNSFW, setIsNSFW] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetcher(url, { withResHeaders: true })
      .then((response) => {
        setIsLoading(false);
        setImageSrc(window.URL.createObjectURL(response.payload));
        setIsNSFW(response.headers.get('nsfw-content'));
      });
    return () => window.URL.revokeObjectURL(imageSrc);
  }, [url]);

  const onImageClick = (e) => {
    if (!isNSFW && onClick) onClick(e);
    setIsNSFW(false);
  };
  const getImageFilters = () => {
    if (isLoading) return { filter: 'blur(5px)' };
    if (isNSFW) return { filter: 'blur(20px)' };
    return '';
  };
  return (
    <span data-testid={testId} onClick={onImageClick} className="Image" style={{ cursor: onClick || isNSFW ? 'pointer' : 'initial' }}>
      <img
        onError={() => setImageSrc(defaultImage)}
        className={className}
        src={imageSrc}
        style={getImageFilters()}
        alt={alt}
      />
      {
            }
      {isNSFW
                && (
                <span className="Image__nsfw-warning">
                  This image has been flagged as NSFW.
                  Click to view it.
                </span>
                )}
    </span>
  );
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  testId: PropTypes.string,
};

Image.defaultProps = {
  className: '',
  testId: '',
};
export default Image;
