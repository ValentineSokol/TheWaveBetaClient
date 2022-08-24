import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import classNames from 'classnames';

function Button({
  children, hover, color, size, type = 'button', transparent, className, disabled, clickHandler, testId,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={
                        classNames(
                          'Button p-1',
                          {
                            'Button--transparent': transparent,
                            [`Button--color-${color}`]: color,
                            [`Button--size-${size}`]: size,
                            [`Button--hover-${hover}`]: hover,
                            [className]: className,
                          },
                        )
                }
      onClick={clickHandler}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['green']),
  size: PropTypes.oneOfType(['small', 'medium', 'large']),
  hover: PropTypes.oneOf(['underline']),
  clickHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
  testId: PropTypes.string,
};

Button.defaultProps = {
  color: '',
  size: '',
  hover: '',
  disabled: false,
  transparent: false,
  type: 'button',
  className: '',
  testId: '',

};
export default Button;
