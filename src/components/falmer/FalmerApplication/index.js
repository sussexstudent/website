import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router';
import { requestAuthToken } from '~falmer/ducks/auth';
import FalmerHeader from '../FalmerHeader';
import FalmerDashboard from '../FalmerDashboard';
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
        <Helmet titleTemplate="%s | Falmer" />
        <FalmerHeader />
        <main className="FalmerViewContainer">
          <Switch>
            <Route path="/" exact component={FalmerDashboard} />
          </Switch>
        </main>
      </section>
    );
  }
}

export default connect(state => ({
  isAuthenticated: state.auth.user !== null,
}))(FalmerApplication);
