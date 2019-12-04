import React from 'react';
import ReactModal from 'react-modal';
import { omit } from 'lodash';
import { COLORS, MQ, TYPE_PRIMARY } from '@ussu/basil/src/style';

interface EnchancedModalProps {
  size?: 'small' | 'normal' | 'full';

  footerClose?: boolean;
}

const Modal: React.FC<ReactModal.Props & EnchancedModalProps> = (props) => (
  <ReactModal
    closeTimeoutMS={300}
    css={[
      {
        position: 'relative',
        width: '100%',
        background: 'rgb(255, 255, 255)',
        overflow: 'auto',
        outline: 'none',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        [MQ.Medium]: {
          width:
            props.size === 'small'
              ? 400
              : props.size === 'full'
              ? 'none'
              : '80%',
          maxWidth: 800,

          marginTop: 60,
          marginBottom: 60,
          boxSizing: 'border-box',
          boxShadow: '0 8px 15px 3px rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          flex: 'none',
          minHeight: 0,
        },
      },
    ]}
    overlayClassName="Overlay"
    {...(omit(props, ['size']) as ReactModal.Props)}
  >
    <div css={{ padding: '1rem' }}>{props.children}</div>

    {props.footerClose ? (
      <button
        css={{
          background: COLORS.GREY_SPRING,
          color: COLORS.GREY_SAD_SLATE,
          textAlign: 'center',
          padding: '0.6rem',
          boxSizing: 'border-box',
          fontSize: '1.2rem',
          width: '100%',
          display: 'block',
          fontFamily: TYPE_PRIMARY,
          border: 0,
          fontWeight: 'bold',
          alignSelf: 'flex-end',
          cursor: 'pointer',
        }}
        onClick={(e) => (props.onRequestClose ? props.onRequestClose(e) : null)}
      >
        close
      </button>
    ) : null}
  </ReactModal>
);

export { Modal };
