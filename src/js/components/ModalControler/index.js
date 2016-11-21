import React from 'react';
import Modal from '../Modal';

const siteEl = document.querySelector('.Site');

class ModalControler extends React.Component {
  componentWillReceiveProps(nextProps) {
    siteEl.classList.toggle('Site--modal-active', nextProps.stack.length > 0);
  }

  render() {
    if (this.props.stack.length <= 0) {
      return null;
    }

    return (
      <Modal handleClose={this.props.onClose}>
        {this.props.stack[this.props.stack.length - 1]}
      </Modal>
    );
  }
}

ModalControler.propTypes = {
  stack: React.PropTypes.arrayOf(React.PropTypes.node),
  onClose: React.PropTypes.function,
};

export default ModalControler;
