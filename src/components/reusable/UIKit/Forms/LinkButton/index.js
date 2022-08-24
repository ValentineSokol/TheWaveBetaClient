import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';

function LinkButton({ to, children }) {
  return <Link className="LinkButton" to={to}>{children}</Link>;
}

export default LinkButton;
