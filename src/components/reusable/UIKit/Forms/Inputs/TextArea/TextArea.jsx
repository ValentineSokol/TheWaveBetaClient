import React from 'react';

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

export default TextArea;
