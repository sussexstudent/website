import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
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
  <div className="u-keep-footer-down LokiContainer">
    <Switch>
      <Route path={`/kb/`} component={LoadableHome} exact />
      <Route path={`/kb/:sectionSlug`} component={LoadableSection} exact />
      <Route
        path={`/kb/:sectionSlug/:topicSlug/:articleSlug`}
        component={LoadableArticle}
        exact
      />
    </Switch>
  </div>
);

export default KnowledgeBaseApplication;
