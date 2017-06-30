import React from 'react';
import { connect } from 'react-redux';
import { requestAuthToken } from '@ussu/falmer/ducks/auth';
import FalmerHeader from '../FalmerHeader';
import Loader from '../../Loader';

class FalmerApplication extends React.Component {
  componentDidMount() {
    this.props.dispatch(requestAuthToken());
  }

  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Loader />;
    }

    return (
      <section>
        <FalmerHeader />
      </section>
    );
  }
}

export default connect(state => ({
  isAuthenticated: state.auth.user !== null,
}))(FalmerApplication);
