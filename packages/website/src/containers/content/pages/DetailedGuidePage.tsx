import React from 'react';
import { Page, StreamFieldData } from '../types';
import { Redirect } from 'react-router-dom';

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
