import React from 'react';

import createArraySubsets from '../../../../../utils/createArraySubsets';

import './ItemGrid.scss';

const ItemGrid = ({
  children, layout, itemsPerRow,
}) => {
  const itemRows = createArraySubsets(children, itemsPerRow);
  return itemRows.map(
    (el) => <div className={layout}>{el}</div>,
  );
};

ItemGrid.defaultProps = {
  itemsPerRow: 2,
};
export default ItemGrid;
