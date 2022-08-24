import React from 'react';
import PropTypes from 'prop-types';
import './Heading.scss';

function Heading({ children, size }) {
  const HeadingTag = `h${size}`;
  return <HeadingTag className="Heading">{children}</HeadingTag>;
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
};
Heading.defaultProps = {
  size: '1',
};

export default Heading;
