import React from 'react';
import { Redirect } from 'react-router-dom';
import { Page, StreamFieldData } from '@ussu/common/src/types/content';

interface DetailPageSection extends Page {
  content: StreamFieldData;
}
interface DetailPage extends Page<DetailPageSection[]> {
  content: StreamFieldData;
  relatedLinks: StreamFieldData;
  staffOwners: StreamFieldData;

  root: Page;
  category: Page;
}

export interface DetailedGuidePageProps {
  page: DetailPage; // todo
}

export const DetailedGuidePage: React.FC<DetailedGuidePageProps> = ({
  page: { subPages },
}) => {
  return <Redirect from={'/'} to={subPages[0].path} />;
};
