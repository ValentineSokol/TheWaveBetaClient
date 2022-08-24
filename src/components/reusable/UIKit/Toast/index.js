import React from 'react';
import './Toast.scss';

function Toast({ children }) {
  return (
    <div className="Toast">
      <p className="Toast__message">{children}</p>
    </div>
  );
}

export default Toast;
