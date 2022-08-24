import React from 'react';

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

export default Circle;
