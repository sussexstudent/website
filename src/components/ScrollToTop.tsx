import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { grooves } from '~libs/grooves';

interface IProps extends RouteComponentProps<{}> {}

class ScrollToTop extends React.Component<IProps> {
  componentDidUpdate(prevProps: IProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);

      // nasty hack, do not do. delays tracking of client side page change to account for data loading. ewww
      setTimeout(() => grooves.page(), 1000);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
