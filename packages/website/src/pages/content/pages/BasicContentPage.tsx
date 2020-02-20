import React from 'react';
import StreamField from '../StreamField';
import { Page, StreamFieldData } from '@ussu/common/src/types/content';

interface BasicContentPageData extends Page {
  content: StreamFieldData;
}

export interface BasicContentPageProps {
  page: BasicContentPageData;
}

export const BasicContentPage: React.FC<BasicContentPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <h1>{page.title}</h1>
    <div style={{ maxWidth: '660px' }} className="type-body-copy">
      <StreamField page={page} items={page.content} />
    </div>
  </div>
);
