import React from 'react';
import Loadable from 'react-loadable';
import { LoadableLoading } from '../../components/LoadableLoading';
import GenericContentStreamPage from './pages/GenericContentStreamPage';
import Homepage from './pages/Homepage';
import { SectionContentPage } from './pages/SectionContentPage';
import AnswerPage from '../content/pages/AnswerPage';
import ReferencePage from './pages/ReferencePage';
import DetailedGuideSectionPage from './pages/DetailedGuideSectionPage';
import DetailedGuidePage from './pages/DetailedGuidePage';
import { OutletIndexPage } from './pages/OutletIndexPage';
import { OutletPage } from './pages/OutletPage';
import { KBRootPage } from './pages/KBRootPage';
import { KBCategoryPage } from './pages/KBCategoryPage';
import { BasicContentPage } from './pages/BasicContentPage';
import { Route } from 'react-router';
import { OfficerOverviewPage } from './pages/OfficerOverviewPage';

const StaffPage = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "page.staff" */ '../content/pages/StaffPage'),
});

const FreshersHomepage = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(
      /* webpackChunkName: "page.freshers.homepage" */ '../content/pages/FreshersHomepage'
    ),
});

interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

const pageComponent = (Component: any, page: any) => (routeProps: any) => (
  <Component page={page} {...routeProps} />
);

const pageRouter = (
  indexComponent: any,
  additionalRoutes: { path: string; component: any }[] = [],
) => ({ page }: { page: any }) => {
  return (
    <React.Fragment>
      <Route
        path={page.path}
        component={pageComponent(indexComponent, page)}
        exact
      />
      {additionalRoutes.map((route) => (
        <Route
          key={route.path}
          path={page.path + route.path}
          component={pageComponent(route.component, page)}
          exact
        />
      ))}
    </React.Fragment>
  );
};

export default {
  HomePage: Homepage,
  StaffPage: pageRouter(StaffPage),
  SectionContentPage: pageRouter(SectionContentPage),

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
  OutletIndexPage: pageRouter(OutletIndexPage, [
    { path: 'archive', component: () => <h1>Archive page whoa!</h1> },
  ]),
  OutletPage: pageRouter(OutletPage),
  OfficerOverviewPage: pageRouter(OfficerOverviewPage),

  // Officers
  // TODO: OfficerIndexPage
  // TODO: OfficerPage

  // Volunteering
  // TODO: VolunteeringPage

  // Policy

  SelectionGridPage: pageRouter(GenericContentStreamPage),
} as PageComponentMap;
