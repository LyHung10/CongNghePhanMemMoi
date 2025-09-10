import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.css';

const Button = ({ children, variant = 'primary', onClick, ...props }) => {
  return (
    <button className={`cui-btn cui-btn--${variant}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary','secondary','danger','ghost']),
  onClick: PropTypes.func
};

export default Button;
