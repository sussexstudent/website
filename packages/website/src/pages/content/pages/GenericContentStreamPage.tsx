import React from 'react';
import { Page, StreamFieldData } from '../types';
import StreamField from '../StreamField';

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
      <div className="Layout">
        <StreamField items={body} page={page} />
      </div>
    </div>
  );
};
