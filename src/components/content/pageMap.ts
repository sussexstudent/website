import GenericContentStreamPage from './pages/GenericContentStreamPage';
import HomePage from './pages/HomePage';
import StaffPage from '~components/content/pages/StaffPage';
import { SectionContentPage } from '~components/content/pages/SectionContentPage';
import FreshersHomepage from '~components/content/pages/FreshersHomepage';

interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

export default {
  StaffPage,
  SectionContentPage,
  HomePage,

  // FRESHERS
  FreshersHomepage,

  SelectionGridPage: GenericContentStreamPage,
} as PageComponentMap;
