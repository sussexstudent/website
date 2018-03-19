import React from 'react';
import Modal from "~components/Modal";
import HydroLeaf from "~components/HydroLeaf";

interface IProps {}

interface IState {
  shouldDisplay: boolean;
}

let shouldDisplay = false;

try {
  shouldDisplay = (!window.localStorage.hasOwnProperty('sue18') && window.location.pathname.indexOf('/elections') !== 0 && window.location.pathname.indexOf('/vote') !== 0);
  if (shouldDisplay) {
    window.localStorage.setItem('sue18', 'true')
  }
} catch {
  shouldDisplay = true;
}

class VoteNowModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      shouldDisplay,
    };
  }

  handleClose() {
    this.setState({ shouldDisplay: false })
  }

  render() {
    return this.state.shouldDisplay ? (<Modal handleClose={this.handleClose}>
      <h1>Vote now</h1>
    </Modal>) : null;
  }
}

export const VoteNowModalContainer = HydroLeaf({ name: 'VoteNowModalContainer', disableSSR: true})(VoteNowModal);
