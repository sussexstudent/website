import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/no-static-element-interactions */
function Modal(props) {
  return (
    <div className="ModalContainer">
      <div className="ModalContainer__modal Modal">
        <button
          className="Modal__close"
          onClick={props.handleClose}
          title="Close"
        >
          <span className="u-h">Close</span>
        </button>
        {props.children}
      </div>
      <div
        className="ModalContainer__back"
        onClick={props.handleClose}
        role="presentation"
      />
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
};
/* eslint-enable jsx-a11y/no-static-element-interactions */
export default Modal;
