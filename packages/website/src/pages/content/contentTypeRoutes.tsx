import React from 'react';
import loadable from '@loadable/component';
import { GenericContentStreamPage } from './pages/GenericContentStreamPage';
import { Homepage } from './pages/HomePage';
import { StaffPageProps } from './pages/StaffPage';
import { SectionContentPageProps } from './pages/SectionContentPage';
import { BasicContentPageProps } from './pages/BasicContentPage';
import { KBRootPageProps } from './pages/KBRootPage';
import { KBCategoryPageProps } from './pages/KBCategoryPage';
import { AnswerPageProps } from './pages/AnswerPage';
import { ReferencePageProps } from './pages/ReferencePage';
import { DetailedGuidePageProps } from './pages/DetailedGuidePage';
import { DetailedGuideSectionProps } from './pages/DetailedGuideSectionPage';
import { OutletIndexPageProps } from './pages/OutletIndexPage';
import { OutletPageProps } from './pages/OutletPage';
import { OfficerOverviewPageProps } from './pages/OfficerOverviewPage';
import { OfficerIndexProps } from './pages/OfficersIndex';
import { OfficerEventsPageProps } from './pages/OfficerEventsPage';
interface PageComponentMap {
  [wagtailModel: string]: any; // todo
}

export const contentTypeMap: PageComponentMap = {
  HomePage: Homepage,
  StaffPage: loadable<StaffPageProps>(async () => {
    const { StaffPage } = await import('./pages/StaffPage');
    return (props) => <StaffPage {...props} />;
  }),
  SectionContentPage: loadable<SectionContentPageProps>(async () => {
    const { SectionContentPage } = await import('./pages/SectionContentPage');
    return (props) => <SectionContentPage {...props} />;
  }),
  BasicContentPage: loadable<BasicContentPageProps>(async () => {
    const { BasicContentPage } = await import('./pages/BasicContentPage');
    return (props) => <BasicContentPage {...props} />;
  }),

  // FRESHERS
  FreshersHomepage: loadable<any>(async () => {
    const { FreshersSwitcher } = await import('./pages/FreshersSwitcher');
    return (props) => <FreshersSwitcher {...props} />;
  }),

  // Knowledge
  KBRootPage: loadable<KBRootPageProps>(async () => {
    const { KBRootPage } = await import('./pages/KBRootPage');
    return (props) => <KBRootPage {...props} />;
  }),

  KBCategoryPage: loadable<KBCategoryPageProps>(async () => {
    const { KBCategoryPage } = await import('./pages/KBCategoryPage');
    return (props) => <KBCategoryPage {...props} />;
  }),

  AnswerPage: loadable<AnswerPageProps>(async () => {
    const { AnswerPage } = await import('./pages/AnswerPage');
    return (props) => <AnswerPage {...props} />;
  }),

  ReferencePage: loadable<ReferencePageProps>(async () => {
    const { ReferencePage } = await import('./pages/ReferencePage');
    return (props) => <ReferencePage {...props} />;
  }),

  DetailedGuidePage: loadable<DetailedGuidePageProps>(async () => {
    const { DetailedGuidePage } = await import('./pages/DetailedGuidePage');
    return (props) => <DetailedGuidePage {...props} />;
  }),
  DetailedGuideSectionPage: loadable<DetailedGuideSectionProps>(async () => {
    const { DetailedGuideSectionPage } = await import(
      './pages/DetailedGuideSectionPage'
    );
    return (props) => <DetailedGuideSectionPage {...props} />;
  }),

  // TODO: BasicContentPage

  // Outlets
  OutletIndexPage: loadable<OutletIndexPageProps>(async () => {
    const { OutletIndexPage } = await import('./pages/OutletIndexPage');
    return (props) => <OutletIndexPage {...props} />;
  }),
  OutletPage: loadable<OutletPageProps>(async () => {
    const { OutletPage } = await import('./pages/OutletPage');
    return (props) => <OutletPage {...props} />;
  }),

  // Officers
  OfficerOverviewPage: loadable<OfficerOverviewPageProps>(async () => {
    const { OfficerOverviewPage } = await import('./pages/OfficerOverviewPage');
    return (props) => <OfficerOverviewPage {...props} />;
  }),

  OfficersIndex: loadable<OfficerIndexProps>(async () => {
    const { OfficersIndex } = await import('./pages/OfficersIndex');
    return (props) => <OfficersIndex {...props} />;
  }),

  OfficerEventsPage: loadable<OfficerEventsPageProps>(async () => {
    const { OfficerEventsPage } = await import('./pages/OfficerEventsPage');
    return (props) => <OfficerEventsPage {...props} />;
  }),

  // Volunteering
  // TODO: VolunteeringPage

  // Policy

  SelectionGridPage: GenericContentStreamPage,
};
