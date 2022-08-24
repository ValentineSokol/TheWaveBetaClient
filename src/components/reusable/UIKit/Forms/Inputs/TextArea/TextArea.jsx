import React from 'react';
import PropTypes from 'prop-types';

import './TextArea.scss';

function TextArea({
  value, placeholder, rows, cols, changeHandler,
}) {
  return (
    <div className="TextAreaContainer">
      {// <Label label={label} />
       }
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onChange={changeHandler}
      />
    </div>
  );
}

TextArea.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
};
TextArea.defaultProps = {
  placeholder: '',
  rows: 10,
  cols: 20,
};

export default TextArea;
