import React from 'react';

import './FlexContainer.scss';

function FlexContainer({ children, column }) {
  return <div style={{ flexDirection: column ? 'column' : 'row' }} className="FlexContainer">{children}</div>;
}
export default FlexContainer;
