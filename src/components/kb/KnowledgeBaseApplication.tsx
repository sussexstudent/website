import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import HydroLeaf from '~components/HydroLeaf';
import { LoadableLoading } from '~components/LoadableLoading';

const LoadableHome = Loadable({
  loading: LoadableLoading,
  loader: () => import(/* webpackChunkName: "kb.home" */ './KbHome'),
});

const LoadableSection = Loadable({
  loading: LoadableLoading,
  loader: () => import(/* webpackChunkName: "kb.section" */ './KbSection'),
});

const LoadableArticle = Loadable({
  loading: LoadableLoading,
  loader: () => import(/* webpackChunkName: "kb.article" */ './KbArticle'),
});

const KnowledgeBaseApplication = () => (
  <div className="u-keep-footer-down">
    <Switch>
      <Route path={`/help/`} component={LoadableHome} exact />
      <Route path={`/help/:sectionSlug`} component={LoadableSection} exact />
      <Route
        path={`/help/:sectionSlug/:topicSlug/:articleSlug`}
        component={LoadableArticle}
        exact
      />
    </Switch>
  </div>
);

export default HydroLeaf({ disableSSR: true, name: 'KnowledgeBase' })(
  KnowledgeBaseApplication,
);
