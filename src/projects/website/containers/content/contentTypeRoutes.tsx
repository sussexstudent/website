import React from 'react';
import Loadable from 'react-loadable';
import { LoadableLoading } from '~components/LoadableLoading';
import GenericContentStreamPage from './pages/GenericContentStreamPage';
import HomePage from './pages/HomePage';
import { SectionContentPage } from '~website/containers/content/pages/SectionContentPage';
import AnswerPage from '~website/containers/content/pages/AnswerPage';
import ReferencePage from './pages/ReferencePage';
import DetailedGuideSectionPage from './pages/DetailedGuideSectionPage';
import DetailedGuidePage from './pages/DetailedGuidePage';
import { OutletIndexPage } from '~website/containers/content/pages/OutletIndexPage';
import { OutletPage } from '~website/containers/content/pages/OutletPage';
import { KBRootPage } from '~website/containers/content/pages/KBRootPage';
import { KBCategoryPage } from '~website/containers/content/pages/KBCategoryPage';
import { BasicContentPage } from '~website/containers/content/pages/BasicContentPage';
import {Route} from 'react-router';

const StaffPage = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "page.staff" */ '~website/containers/content/pages/StaffPage'),
});

const FreshersHomepage = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "page.freshers.homepage" */ '~website/containers/content/pages/FreshersHomepage'),
});

interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

const pageComponent = (Component: any, page: any) => (routeProps: any) => <Component page={page} {...routeProps} />;

const pageRouter = (indexComponent: any, additionalRoutes: { path: string, component: any }[] = []) => ({ page }: { page: any }) => {
  return (
    <React.Fragment>
      <Route path={page.path} component={pageComponent(indexComponent, page)} exact />
      {additionalRoutes.map(route => <Route key={route.path} path={page.path + route.path} component={pageComponent(route.component, page)} exact /> )}
    </React.Fragment>
  );
};

export default {
  StaffPage: pageRouter(StaffPage),
  SectionContentPage: pageRouter(SectionContentPage),

  HomePage: pageRouter(HomePage),

  BasicContentPage: pageRouter(BasicContentPage),

  // FRESHERS
  FreshersHomepage: pageRouter(FreshersHomepage),

  // Knowledge
  KBRootPage: pageRouter(KBRootPage),
  KBCategoryPage: pageRouter(KBCategoryPage),
  AnswerPage: pageRouter(AnswerPage),
  ReferencePage: pageRouter(ReferencePage),
  DetailedGuidePage: pageRouter(DetailedGuidePage),
  DetailedGuideSectionPage: pageRouter(DetailedGuideSectionPage),

  // TODO: BasicContentPage

  // Outlets
  OutletIndexPage: pageRouter(OutletIndexPage, [{ path: 'archive', component: () => <h1>Archive page whoa!</h1> }]),
  OutletPage: pageRouter(OutletPage),

  // Officers
  // TODO: OfficerIndexPage
  // TODO: OfficerPage

  // Volunteering
  // TODO: VolunteeringPage

  // Policy

  SelectionGridPage: pageRouter(GenericContentStreamPage),
} as PageComponentMap;
