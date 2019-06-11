import React from 'react';
import cx from 'classnames';
import ReactModal from 'react-modal';
import { omit } from 'lodash';

interface EnchancedModalProps {
  size?: 'small' | 'normal' | 'full';

  footerClose?: boolean;
}

const Modal = (
  props: ReactModal.Props & EnchancedModalProps & { children: any },
) => (
  <ReactModal
    className={cx('Modal', {
      'Modal--small': props.size === 'small',
      'Modal--full': props.size === 'full',
    })}
    overlayClassName="Overlay"
    {...omit(props, ['size']) as ReactModal.Props}
  >
    <div className="Modal__content">{props.children}</div>

    {props.footerClose ? (
      <button
        className="Modal__footerClose"
        onClick={(e) => (props.onRequestClose ? props.onRequestClose(e) : null)}
      >
        close
      </button>
    ) : null}
  </ReactModal>
);

export { Modal };
