import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { requestAuthToken } from '../../ducks/auth';
import FalmerHeader from '../../components/FalmerHeader';
import { Loader } from '@ussu/website/src/components/Loader';
import { RootState } from '@ussu/common/src/types/falmer';
import { Switch, Route } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Modal from 'react-modal';
import { EventsListProps } from '@ussu/website/src/pages/whatson/WhatsOnListings';
import loadable from '@loadable/component';
import { LoginPage } from '../../components/LoginPage';

Modal.setAppElement('.FalmerAppRoot');

const LoadableMedia = loadable<EventsListProps>(async () => {
  const { FalmerMedia } = await import('../FalmerMedia');
  return (props) => <FalmerMedia {...props} />;
});

const LoadableBookMarket = loadable(async () => {
  const { FalmerBookMarket } = await import('../FalmerBookMarket');
  return (props) => <FalmerBookMarket {...props} />;
});

const LoadableStudentGroups = loadable(async () => {
  const { FalmerStudentGroups } = await import('../FalmerStudentGroups');
  return (props) => <FalmerStudentGroups {...props} />;
});

const LoadableEvents = loadable(async () => {
  const { FalmerEvents } = await import('../FalmerEvents');
  return (props) => <FalmerEvents {...props} />;
});

const LoadableDashboard = loadable(async () => {
  const { FalmerDashboard } = await import('../FalmerDashboard');
  return (props) => <FalmerDashboard {...props} />;
});

const LoadableFeaturedAreas = loadable(async () => {
  const { FalmerFeaturedAreas } = await import('../FalmerFeaturedAreas');
  return (props) => <FalmerFeaturedAreas {...props} />;
});

export const FalmerApplication: React.FC = () => {
  const mapState = useCallback((state: RootState) => state.auth, []);
  const auth = useMappedState(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAuthToken());
  }, []);

  if (auth.loading) {
    return <Loader />;
  }

  if (auth.user === null) {
    return <LoginPage />;
  }

  return (
    <section>
      <Helmet titleTemplate="%s | Falmer" />
      <FalmerHeader />
      <main className="FalmerViewContainer">
        <Switch>
          <Route component={LoadableDashboard} path="/" exact />
          <Route component={LoadableEvents} path="/events" />
          <Route component={LoadableStudentGroups} path="/groups" />
          <Route component={LoadableMedia} path="/media" />
          <Route component={LoadableBookMarket} path="/book-market" />
          <Route component={LoadableFeaturedAreas} path="/featured-areas" />
        </Switch>
      </main>
    </section>
  );
};
