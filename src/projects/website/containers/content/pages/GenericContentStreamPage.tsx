import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import StreamField from '~website/containers/content/StreamField';

interface GenericContentStreamPage extends Page {
  body: StreamFieldData;
}

interface IProps {
  page: GenericContentStreamPage;
}

const GenericContentStreamPage: React.FC<IProps> = ({
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

export default GenericContentStreamPage;
