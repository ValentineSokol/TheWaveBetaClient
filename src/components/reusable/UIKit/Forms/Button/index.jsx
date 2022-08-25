import React from 'react';
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
