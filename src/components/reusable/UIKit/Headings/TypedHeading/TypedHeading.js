import React from 'react';
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
TypedHeading.defaultProps = {
  size: '1',
  loop: false,
};
export default TypedHeading;
