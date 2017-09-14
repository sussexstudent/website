import React from 'react';
import Modal from 'react-modal';

export default props => (
  <Modal
    {...props}
    style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        zIndex: 400,
      },
      content: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '20px',
        border: '1px solid rgb(200, 200, 200)',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        boxShadow: '0 1px 5px 0 rgba(30, 30, 30, 0.1)',
      },
    }}
  >
    {props.children}
  </Modal>
);
