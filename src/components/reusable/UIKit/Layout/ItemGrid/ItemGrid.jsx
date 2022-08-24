import React from 'react';
import PropTypes from 'prop-types';

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

ItemGrid.propTypes = {
  children: PropTypes.node.isRequired,
  itemsPerRow: PropTypes.number,
  layout: PropTypes.oneOf(['row', 'column']),
};
ItemGrid.defaultProps = {
  itemsPerRow: 2,
  layout: 'row',
};
export default ItemGrid;
