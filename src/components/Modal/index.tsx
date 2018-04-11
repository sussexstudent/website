import React from 'react';

interface IProps {
  handleClose(): void;
}

const Modal: React.SFC<IProps> = (props) => {
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
};

export default Modal;
