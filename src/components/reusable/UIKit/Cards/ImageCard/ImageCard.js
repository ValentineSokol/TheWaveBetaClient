import React from 'react';
import Card from '../Card/Card';
import TypedHeading from '../../Headings/TypedHeading/TypedHeading';
import Heading from '../../Headings/Heading/Heading';
import './ImageCard.scss';

function ImageCard({
  image, round, imageAlt, headingStrings, headingSize, text, width, padding,
}) {
  return (
    <Card width={width} padding={padding}>
      <div className="ContentWrapper">
        <img className={round && 'RoundImage'} data-testid="image" src={image} alt={imageAlt} />
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

export default ImageCard;
