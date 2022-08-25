import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationLink.scss';

function NavigationLink({ to, children }) {
  return (
    <NavLink to={to} exact className="NavigationLink" activeClassName="Active">
      {children}
    </NavLink>
  );
}

export default NavigationLink;
