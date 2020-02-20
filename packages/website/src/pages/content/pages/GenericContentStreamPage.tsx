import React from 'react';
import StreamField from '../StreamField';
import { Page, StreamFieldData } from '@ussu/common/src/types/content';

interface GenericContentStreamPage extends Page {
  body: StreamFieldData;
}

interface IProps {
  page: GenericContentStreamPage;
}

export const GenericContentStreamPage: React.FC<IProps> = ({
  page: { body },
  page,
}) => {
  return (
    <div className="LokiContainer">
      <StreamField items={body} page={page} />
    </div>
  );
};
