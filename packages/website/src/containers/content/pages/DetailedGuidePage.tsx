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

interface Props {
  page: DetailPage; // todo
}

const DetailedGuideSectionPage: React.FC<Props> = ({ page: { subPages } }) => {
  return <Redirect from={'/'} to={subPages[0].path} />;
};

export default DetailedGuideSectionPage;
