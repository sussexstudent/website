import Loadable from 'react-loadable';
import { LoadableLoading } from '~components/LoadableLoading';
import GenericContentStreamPage from './pages/GenericContentStreamPage';
import HomePage from './pages/HomePage';
import { SectionContentPage } from '~website/containers/content/pages/SectionContentPage';

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

  // FRESHERS
  FreshersHomepage,

  SelectionGridPage: GenericContentStreamPage,
} as PageComponentMap;
