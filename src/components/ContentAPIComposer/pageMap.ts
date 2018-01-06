import StaffPage from '~components/StaffPage';
import SectionContentPage from './SectionContentPage';
import HomePage from './HomePage';
import ComponentStreamPage from './ComponentStreamPage';

interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

export default {
  'content.StaffPage': StaffPage,
  'content.SelectionGridPage': ComponentStreamPage,
  'content.SectionContentPage': SectionContentPage,
  'content.HomePage': HomePage,
} as PageComponentMap;
