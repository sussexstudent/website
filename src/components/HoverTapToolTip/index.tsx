import React from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { Popper, Manager, Reference } from 'react-popper';

interface HoverTapTooltipProps {
  children: (handlers: {
    ref: any;
    handleOpen(): void;
    handleClose(): void;
  }) => any;
  content: any;
}

interface HoverTapTooltipState {
  isOpen: boolean;
}

export class HoverTapTooltip extends React.Component<
  HoverTapTooltipProps,
  HoverTapTooltipState
> {
  state = {
    isOpen: false,
  };

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });

  render() {
    const { content, children } = this.props;
    const { isOpen } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            children({
              ref,
              handleOpen: this.handleOpen,
              handleClose: this.handleClose,
            })
          }
        </Reference>
        {isOpen
          ? document.body &&
            createPortal(
              <Popper placement="top">
                {(props) => (
                  <div
                    ref={props.ref}
                    style={props.style}
                    data-placement={props.placement}
                    className={'Popover'}
                  >
                    <div
                      className={cx('Popover__inner', {
                        'Popover--open': true,
                      })}
                    >
                      {content()}
                    </div>
                    <div
                      ref={props.arrowProps.ref}
                      style={props.arrowProps.style}
                    />
                  </div>
                )}
              </Popper>,
              document.body,
            )
          : null}
      </Manager>
    );
  }
}
