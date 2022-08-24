import React from 'react';
import PropTypes from 'prop-types';
import Typed from '../../../Typed';
import Heading from '../Heading/Heading';

function TypedHeading({ headingStrings, size, loop }) {
  return (
    <Heading size={size}>
      {
            headingStrings
              ? <Typed strings={headingStrings} loop={loop} />
              : null

        }
    </Heading>
  );
}

TypedHeading.propTypes = {
  headingStrings: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  loop: PropTypes.bool,
};
TypedHeading.defaultProps = {
  size: '1',
  loop: false,
};
export default TypedHeading;
