import Loadable from 'react-loadable';
import { LoadableLoading } from '../../components/LoadableLoading';
import GenericContentStreamPage from './pages/GenericContentStreamPage';
import Homepage from './pages/HomePage';
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
import { OfficerOverviewPage } from './pages/OfficerOverviewPage';
import { OfficersIndex } from './pages/OfficersIndex';

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

export const contentTypeMap: PageComponentMap = {
  HomePage: Homepage,
  StaffPage: StaffPage,
  SectionContentPage: SectionContentPage,

  BasicContentPage: BasicContentPage,

  // FRESHERS
  FreshersHomepage: FreshersHomepage,

  // Knowledge
  KBRootPage: KBRootPage,
  KBCategoryPage: KBCategoryPage,
  AnswerPage: AnswerPage,
  ReferencePage: ReferencePage,
  DetailedGuidePage: DetailedGuidePage,
  DetailedGuideSectionPage: DetailedGuideSectionPage,

  // TODO: BasicContentPage

  // Outlets
  OutletIndexPage: OutletIndexPage,
  OutletPage: OutletPage,

  // Officers
  OfficerOverviewPage: OfficerOverviewPage,
  OfficersIndex: OfficersIndex,

  // Volunteering
  // TODO: VolunteeringPage

  // Policy

  SelectionGridPage: GenericContentStreamPage,
};
