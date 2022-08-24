import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NavigationLink.scss';

function NavigationLink({ to, children }) {
  return (
    <NavLink to={to} exact className="NavigationLink" activeClassName="Active">
      {children}
    </NavLink>
  );
}

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigationLink;
