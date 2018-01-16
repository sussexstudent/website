import GenericContentStreamPage from './pages/GenericContentStreamPage';
import HomePage from "./pages/HomePage";

interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

export default {
  'SelectionGridPage': GenericContentStreamPage,
  'HomePage': HomePage,
} as PageComponentMap;

