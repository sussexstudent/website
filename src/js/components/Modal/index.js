import React from 'react';
/* eslint-disable jsx-a11y/no-static-element-interactions */
function Modal(props) {
  return (
    <div className="ModalContainer">
      <div className="ModalContainer__modal Modal">
        {props.children}
      </div>
      <div className="ModalContainer__back" onClick={props.handleClose} role="presentation" />
    </div>
  );
}

Modal.propTypes = {
  children: React.PropTypes.node,
  handleClose: React.PropTypes.function,
};
/* eslint-enable jsx-a11y/no-static-element-interactions */
export default Modal;
