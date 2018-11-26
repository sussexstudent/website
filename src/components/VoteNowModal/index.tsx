import React from 'react';
import { Modal } from '~components/Modal';
import HydroLeaf from '~components/HydroLeaf';
import { VoteNowBox } from '~components/Bento/treatments/VoteNowBox';

interface IProps {}

interface IState {
  shouldDisplay: boolean;
}

let shouldDisplay = false;

try {
  shouldDisplay =
    !window.localStorage.hasOwnProperty('sue18') &&
    window.location.pathname !== '/' &&
    window.location.pathname.indexOf('/elections') !== 0 &&
    window.location.pathname.indexOf('/vote') !== 0;
  if (shouldDisplay) {
    window.localStorage.setItem('sue18', 'true');
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
    this.setState({ shouldDisplay: false });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.shouldDisplay}
        onRequestClose={this.handleClose}
      >
        <VoteNowBox
          link="/vote/"
          imageUrl="original_images/23748e8e475049fe8e49162ccd827b44"
          votingStartsDate={new Date(2018, 10, 22, 12, 0,0)}
          votingEndsDate={new Date(2018, 10, 27, 12, 0,0)}
        />
      </Modal>
    );
  }
}

export const VoteNowModalContainer = HydroLeaf({
  name: 'VoteNowModalContainer',
  disableSSR: true,
})(VoteNowModal);
