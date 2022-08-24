import React from 'react';
import PropTypes from 'prop-types';
import withTranslation from '../reusable/withTranslation';

import TypedHeading from '../reusable/UIKit/Headings/TypedHeading/TypedHeading';
import ItemGrid from '../reusable/UIKit/Layout/ItemGrid/ItemGrid';
import ImageCard from '../reusable/UIKit/Cards/ImageCard/ImageCard';

function LandingPage({ translation }) {
  return (
    <div>
      <TypedHeading headingStrings={translation?.typedStrings} loop />
      <div className="LandingCards">
        <ItemGrid>
          {
              translation?.cards.map((cardData) => (
                <ImageCard
                  width="50%"
                  headingSize="3"
                  headingStrings={cardData.headingStrings}
                  image={cardData.image}
                  imageAlt={cardData.imageAlt}
                  text={cardData.text}
                />
              ))
          }
        </ItemGrid>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  translation: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    typedStrings: PropTypes.arrayOf(PropTypes.string).isRequired,
    cards: PropTypes.shape({
      image: PropTypes.string.isRequired,
      imageAlt: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,

  }).isRequired,
};
export default withTranslation(LandingPage, 'landing');
