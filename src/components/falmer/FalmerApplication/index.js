import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { requestAuthToken } from '~falmer/ducks/auth';
import FalmerHeader from '../FalmerHeader';
import Loader from '../../Loader';
import LoadableLoading from '../../LoadableLoading';

const LoadableMedia = Loadable({
  loader: () => import(/* webpackChunkName: "Media" */ '../FalmerMedia'),
  loading: LoadableLoading,
});

const LoadableBookMarket = Loadable({
  loader: () =>
    import(/* webpackChunkName: "BookMarket" */ '../FalmerBookMarket'),
  loading: LoadableLoading,
});

const LoadableStudentGroups = Loadable({
  loader: () =>
    import(/* webpackChunkName: "StudentGroups" */ '../FalmerStudentGroups'),
  loading: LoadableLoading,
});

const LoadableEvents = Loadable({
  loader: () => import(/* webpackChunkName: "Events" */ '../FalmerEvents'),
  loading: LoadableLoading,
});

const LoadableDashboard = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Dashboard" */ '../FalmerDashboard'),
  loading: LoadableLoading,
});

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
            <Route path="/" exact component={LoadableDashboard} />
            <Route path="/events" component={LoadableEvents} />
            <Route path="/groups" component={LoadableStudentGroups} />
            <Route path="/media" component={LoadableMedia} />
            <Route path="/book-market" component={LoadableBookMarket} />
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
