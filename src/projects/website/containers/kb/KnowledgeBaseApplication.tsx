import React from 'react';
import { Router } from '@reach/router';
import Loadable from 'react-loadable';
import { LoadableLoading } from '~components/LoadableLoading';
import { RouteComponent } from '~types/routes';

const LoadableHome = Loadable({
  loading: LoadableLoading,
  loader: () => import(/* webpackChunkName: "kb.home" */ './KbHome'),
}) as any;

const LoadableSection = Loadable({
  loading: LoadableLoading,
  loader: () => import(/* webpackChunkName: "kb.section" */ './KbSection'),
}) as any;

const LoadableArticle = Loadable({
  loading: LoadableLoading,
  loader: () => import(/* webpackChunkName: "kb.article" */ './KbArticle'),
}) as any;

const KnowledgeBaseApplication: React.SFC<RouteComponent> = () => (
  <div className="u-keep-footer-down LokiContainer">
    <Router>
      <LoadableHome path="/" />
      <LoadableSection path=":sectionSlug" />
      <LoadableArticle path=":sectionSlug/:topicSlug/:articleSlug" />
    </Router>
  </div>
);

export default KnowledgeBaseApplication;
