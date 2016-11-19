import React from 'react';
import Modal from '../Modal';

function ModalControler(props) {
  if (props.stack.length <= 0) {
    return null;
  }

  return (
    <Modal handleClose={props.onClose}>
      {props.stack[props.stack.length - 1]}
    </Modal>
  );
}

ModalControler.propTypes = {
  stack: React.PropTypes.arrayOf(React.PropTypes.node),
  onClose: React.PropTypes.function,
};

export default ModalControler;
