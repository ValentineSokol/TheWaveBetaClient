import React from 'react';
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

export default withTranslation(LandingPage, 'landing');
