import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.css';

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="cui-modal-backdrop" onClick={onClose}>
      <div className="cui-modal" onClick={e => e.stopPropagation()}>
        <div className="cui-modal-header">
          <h3>{title}</h3>
          <button className="cui-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="cui-modal-body">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string
};

export default Modal;
