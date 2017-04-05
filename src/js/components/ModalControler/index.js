import React from 'react';
import Modal from '../Modal';
import classToggle from '../../libs/dom/classToggle';

const htmlEl = document.documentElement;

class ModalControler extends React.Component {
  componentWillReceiveProps(nextProps) {
    classToggle(htmlEl, 'html--locked', nextProps.stack.length > 0);
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
  stack: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
  onClose: React.PropTypes.func.isRequired,
};

export default ModalControler;
