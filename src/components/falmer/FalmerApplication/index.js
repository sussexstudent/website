import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { requestAuthToken } from '~falmer/ducks/auth';
import FalmerHeader from '../FalmerHeader';
import FalmerDashboard from '../FalmerDashboard';
import FalmerEvents from '../FalmerEvents';
import FalmerStudentGroups from '../FalmerStudentGroups';
import FalmerMedia from '../FalmerMedia';
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
            <Route path="/events" component={FalmerEvents} />
            <Route path="/groups" component={FalmerStudentGroups} />
            <Route path="/media" component={FalmerMedia} />
          </Switch>
        </main>
      </section>
    );
  }
}

export default withRouter(
  connect(state => ({
    isAuthenticated: state.auth.user !== null,
  }))(FalmerApplication)
);
