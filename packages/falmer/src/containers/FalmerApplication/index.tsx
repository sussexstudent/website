import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import { requestAuthToken } from '../../ducks/auth';
import FalmerHeader from '../../components/FalmerHeader';
import Loader from '@ussu/website/src/components/Loader';
import LoadableLoading from '@ussu/website/src/components/LoadableLoading';
import { RootState } from '@ussu/common/src/types/falmer';
import { Switch, Route } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Modal from 'react-modal';

Modal.setAppElement('.FalmerAppRoot');

const LoadableMedia = Loadable({
  loader: () => import(/* webpackChunkName: "Media" */ '../FalmerMedia'),
  loading: LoadableLoading,
}) as any;

const LoadableBookMarket = Loadable({
  loader: () =>
    import(/* webpackChunkName: "BookMarket" */ '../FalmerBookMarket'),
  loading: LoadableLoading,
}) as any;

const LoadableStudentGroups = Loadable({
  loader: () =>
    import(/* webpackChunkName: "StudentGroups" */ '../FalmerStudentGroups'),
  loading: LoadableLoading,
}) as any;

const LoadableEvents = Loadable({
  loader: () => import(/* webpackChunkName: "Events" */ '../FalmerEvents'),
  loading: LoadableLoading,
}) as any;

const LoadableDashboard = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Dashboard" */ '../FalmerDashboard'),
  loading: LoadableLoading,
}) as any;

const LoadableFeaturedAreas = Loadable({
  loader: () =>
    import(/* webpackChunkName: "FeaturedAreas" */ '../FalmerFeaturedAreas'),
  loading: LoadableLoading,
});

export const FalmerApplication: React.FC = () => {
  const mapState = useCallback(
    (state: RootState) => state.auth.user !== null,
    [],
  );
  const isAuthenticated = useMappedState(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAuthToken());
  }, []);

  if (!isAuthenticated) {
    return <Loader />;
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
