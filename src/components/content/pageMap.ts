import GenericContentStreamPage from './pages/GenericContentStreamPage';
import HomePage from './pages/HomePage';
import StaffPage from '~components/content/pages/StaffPage';
import { SectionContentPage } from '~components/content/pages/SectionContentPage';

interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

export default {
  StaffPage,
  SectionContentPage,
  HomePage,
  SelectionGridPage: GenericContentStreamPage,
} as PageComponentMap;
