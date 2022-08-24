import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import classNames from 'classnames';
import TypedHeading from '../../Headings/TypedHeading/TypedHeading';

function Card({
  children, headingStrings, width, classes = '',
}) {
  return (
    <div style={{ width }} className={classNames('Card', { [classes]: classes })}>
      { headingStrings && <TypedHeading headingStrings={headingStrings} /> }
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.string,
  headingStrings: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
Card.defaultProps = {
  classes: '',
  headingStrings: '',
};
export default Card;
