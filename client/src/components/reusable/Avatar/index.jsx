import React from 'react';
import Image from '../Image/Image';

function Avatar({
  testId, clickHandler, url, alt = 'Avatar image',
}) {
  return <Image testId={testId} url={url} className="Avatar" onClick={clickHandler} alt={alt} />;
}
export default Avatar;
