import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import TypedHeading from '../../Headings/TypedHeading/TypedHeading';
import Heading from '../../Headings/Heading/Heading';
import './ImageCard.scss';

function ImageCard({
  image, imageAlt, headingStrings, headingSize, text, width,
}) {
  return (
    <Card width={width}>
      <div className="ContentWrapper">
        <img data-testid="image" src={image} alt={imageAlt} />
        <div>
          {
                 Array.isArray(headingStrings)
                   ? <TypedHeading headingStrings={headingStrings} size={headingSize} />
                   : <Heading size={headingSize}>{headingStrings}</Heading>
             }
          <p data-testid="text-content">{text}</p>
        </div>
      </div>
    </Card>
  );
}

ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  headingStrings: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  width: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  headingSize: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
};

ImageCard.defaultProps = {
  headingSize: '1',
};
export default ImageCard;
