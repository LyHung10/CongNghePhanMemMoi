import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.css';

const Input = ({ value, onChange, ...props }) => {
  return <input className="cui-input" value={value} onChange={e => onChange && onChange(e.target.value)} {...props} />;
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

export default Input;
