import React from 'react';
import PropTypes from 'prop-types';
import Modal from '~components/Modal';
import classToggle from '~libs/dom/classToggle';

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
  stack: PropTypes.arrayOf(PropTypes.node).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalControler;
