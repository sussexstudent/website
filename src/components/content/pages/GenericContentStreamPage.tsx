import React from 'react';
import { Page, StreamFieldData } from '~components/content/types';
import StreamField from '~components/content/StreamField';

interface IProps {
  page: Page<{ body: StreamFieldData }>; // todo
}

class GenericContentStreamPage extends React.Component<IProps> {
  render() {
    const { page: { data: { body } }, page } = this.props;
    return (
      <div className="Layout">
        <StreamField items={body} page={page} />
      </div>
    );
  }
}

export default GenericContentStreamPage;
