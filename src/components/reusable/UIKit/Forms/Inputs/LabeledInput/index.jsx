import React from 'react';
import PropTypes from 'prop-types';
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

LabeledInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  inputClassName: PropTypes.string,
  testId: PropTypes.string,
};

LabeledInput.defaultProps = {
  required: false,
  type: 'text',
  inputClassName: '',
  testId: '',
};
export default LabeledInput;
