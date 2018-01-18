import GenericContentStreamPage from './pages/GenericContentStreamPage';
import HomePage from "./pages/HomePage";
import StaffPage from "~components/content/pages/StaffPage";

interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

export default {
  'StaffPage': StaffPage,
  'SelectionGridPage': GenericContentStreamPage,
  'HomePage': HomePage,
} as PageComponentMap;

