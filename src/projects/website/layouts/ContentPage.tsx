import React from 'react';
import { ContentPage } from '~components/content/ContentPage';

class ContentPageContainer extends React.Component<{ path: string }> {
  render() {
    const { path } = this.props;
    return <ContentPage path={path} />;
  }
}

export default ContentPageContainer;
