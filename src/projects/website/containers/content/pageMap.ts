import Loadable from 'react-loadable';
import { LoadableLoading } from '~components/LoadableLoading';
import GenericContentStreamPage from './pages/GenericContentStreamPage';
import HomePage from './pages/HomePage';
import { SectionContentPage } from '~website/containers/content/pages/SectionContentPage';
import AnswerPage from '~website/containers/content/pages/AnswerPage';
import ReferencePage from './pages/ReferencePage';
import DetailedGuidePage from './pages/DetailedGuidePage';
import { OutletIndexPage } from '~website/containers/content/pages/OutletIndexPage';
import {OutletPage} from "~website/containers/content/pages/OutletPage";
import {KBRootPage} from "~website/containers/content/pages/KBRootPage";
import {KBCategoryPage} from "~website/containers/content/pages/KBCategoryPage";
import {BasicContentPage} from "~website/containers/content/pages/BasicContentPage";

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

export default {
  StaffPage,
  SectionContentPage,

  HomePage,

  BasicContentPage,

  // FRESHERS
  FreshersHomepage,

  // Knowledge
  KBRootPage,
  KBCategoryPage,
  AnswerPage,
  ReferencePage,
  DetailedGuidePage,

  // TODO: BasicContentPage

  // Outlets
  OutletIndexPage,
  OutletPage,

  // Officers
  // TODO: OfficerIndexPage
  // TODO: OfficerPage


  // Volunteering
  // TODO: VolunteeringPage

  // Policy


  SelectionGridPage: GenericContentStreamPage,
} as PageComponentMap;
