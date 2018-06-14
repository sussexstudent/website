import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps<{}> {}

class ScrollToTop extends React.Component<IProps> {
  componentDidUpdate(prevProps: IProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
