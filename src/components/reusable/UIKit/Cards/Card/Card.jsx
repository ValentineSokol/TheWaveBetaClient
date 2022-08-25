import React from 'react';
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
export default Card;
