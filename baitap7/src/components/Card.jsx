import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.css';

const Card = ({ children }) => <div className="cui-card">{children}</div>;

Card.propTypes = { children: PropTypes.node };

export default Card;
