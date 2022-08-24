import React from 'react';
import './LabeledInput.scss';

function LabeledInput({
  id, onChange, value, name, required, label, type = 'text', inputClassName = '', testId,
}) {
  return (
    <div className="LabeledInput">
      <label className="LabeledInput__label" htmlFor={id}>
        {label}
        {' '}
        { required && <span>(required)</span>}
        :
        <input
          data-testid={testId}
          className={`LabeledInput__input ${inputClassName}`}
          id={id}
          onChange={onChange}
          name={name}
          value={value}
          type={type}
          required={required}
        />
      </label>
    </div>
  );
}

export default LabeledInput;
