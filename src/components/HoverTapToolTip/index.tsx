import React from 'react';
import cx from 'classnames';
import { Popper, Manager, Reference } from 'react-popper';

interface HoverTapTooltipProps {
  children: (
    handlers: { ref: any; handleOpen(): void; handleClose(): void },
  ) => any;
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
        {isOpen ? (
          <Popper placement="top">
            {(props) => (
              <div
                className={cx('Popover', { 'Popover--open': true })}
                ref={props.ref}
                style={props.style}
                data-placement={props.placement}
              >
                {content}
                <div
                  ref={props.arrowProps.ref}
                  style={props.arrowProps.style}
                />
              </div>
            )}
          </Popper>
        ) : null}
      </Manager>
    );
  }
}
